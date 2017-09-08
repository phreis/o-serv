import { OService } from './o-service';
import { OHttp, OHeader } from './o-http';
import { Observable } from 'rxjs/Observable';



import 'rxjs/add/operator/map';

export class OModel {
  private _resourcePath: string;
  private http: OHttp = new OHttp();
  private _service: OService;
  constructor(service: OService, resourcePath: string) {
    this._resourcePath = resourcePath;
    this._service = service;
  };

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

  public getMetadata(): Observable<Object> {
  //TODO: parse entity set name from resourcePath, somehow
    return this._service.getMetadataPropertiesOfSet(this._resourcePath); 
  }

  public getEntitySkipTop(skip: string, top: string): Observable<Object> {

    const _url = this._service.get_serviceRootUrl() + this._resourcePath  + '/?$skip=' + skip + '&$top=' + top;
    return this.http.get(_url, this._service.get_headers()).map(this._entityMap, this);
  }

}
