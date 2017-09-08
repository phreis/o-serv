import { Observable } from 'rxjs/Observable';
import { OHttp, OHeader } from './o-http';
import { OModel } from './o-model';
import { parseString } from 'xml2js';
import 'rxjs/add/operator/map';



export class OService {
  private static me: OService[] = [];
  private _serviceRootUrl: string = '';
  private _modelContainer: OModel[];

  private _headers: OHeader[] = [
    {
      key: "accept",
      value: "application/json"
    }
  ];;
  private http: OHttp = new OHttp();
  private constructor(url: string, headers?: OHeader[]) {
    this._serviceRootUrl = url;
    if (headers) this._headers = this._headers.concat(headers);
  };

public get_serviceRootUrl():string {
  return this._serviceRootUrl;
}
public get_headers():OHeader[] {
  return this._headers;
}
  public static getInstance(url: string, headers?: OHeader[]): OService {
    let candidate: OService = this.me.find((m) => { return m._serviceRootUrl == url })
    if (!candidate) {
      candidate = new OService(url, headers);
      this.me.push(candidate);
    }
    return candidate;
  }

  private getMetadata(): Observable<Object> {
    const _url = this._serviceRootUrl + '$metadata';
    return this.http.get(_url).map(this._parseXML);//TODO: attach auth header
  };

  public getModel(resourcePath: string): OModel {
    return new OModel(this, resourcePath)
  }
  private _getResultEntity(obj: Object): Object {
    let _hit = null;
    for (const i in obj) {
      if (Object.prototype.toString.call(obj[i]) == '[object Array]') {
        return obj[i];
      }
      if (_hit == null && (Object.prototype.toString.call(obj[i]) == '[object Object]')) {
        _hit = this._getResultEntity(obj[i]);
      }
    }
    return _hit;
  };
  private _entityMap(response) {
    return this._getResultEntity(JSON.parse(response));
  };

  private _parseXML(res: Response) {

    let metadata: Object;
    parseString(res, function (err: any, result: any) {
      metadata = result;
    });
    return metadata;

  }

  public getMetadataPropertiesOfSet(entitySetName: string): Observable<Object> {
    return this.getMetadata()
      .map(md => { return this.getPropertiesOfSet(md, entitySetName) })
    //            .catch(this.handleError);
  }

  private getPropertiesOfSet(f: Object, entitySetName: string) {
    const sets = this.findElement(f, 'EntitySet');
    const entitySet = sets.filter((f: any) => f['$']['Name'] === entitySetName)
    const entityTypeName = entitySet[0]['$']['EntityType'].replace(/.*\.(.*)/, '$1')
    const entityTypes = this.findElement(f, 'EntityType');
    const entityType = entityTypes.filter((f: any) => f['$']['Name'] === entityTypeName);
    const properties = entityType[0]['Property'];
    return properties;
  }

  public getEntitySets(): Observable<Object[]> {
    return this.getMetadata()
      .map(md => { return this.findElement(md, 'EntitySet') })
    //           .catch(this.handleError);

  }

  /**
   * Takes an JSON Object, iterates recursively and returns a single Element named <elementName>
   * Once we have a hit, we do no more drilldown.
   * @param {Object} obj 
   * @param {String} elementName 
   * @returns {Object} 
   */
  private findElement(obj: Object, elementName: String): any {
    let _hit: Object = null;
    // tslint:disable-next-line:forin
    for (const i in obj) {
      if (i === elementName) {
        return obj[i];
      }
      if (_hit == null && (Object.prototype.toString.call(obj[i]) === '[object Object]' ||
        Object.prototype.toString.call(obj[i]) === '[object Array]')) {
        _hit = this.findElement(obj[i], elementName);
      }
    }
    return _hit;
  }
}
  


