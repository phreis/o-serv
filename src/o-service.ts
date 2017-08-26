import { Observable } from 'rxjs/Observable';
import { OHttp, OHeader } from './o-http';
import { OModel } from './o-model';

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
    if(headers) this._headers = this._headers.concat(headers);
  };

  public static getInstance(url: string, headers?: OHeader[]): OService {
    let candidate:OService = this.me.find((m) => {return m._serviceRootUrl == url})
    if (!candidate) { candidate = new OService(url, headers);
    this.me.push(candidate); }
    return candidate;
  }

  public getModel(resourcePath: string): OModel {
    return new OModel(this._serviceRootUrl, resourcePath, this._headers)
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




}
