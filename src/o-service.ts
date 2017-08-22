import { Observable } from 'rxjs/Observable';
import { OHttp, OHeader } from './o-http';

import 'rxjs/add/operator/map';

export class OService {
  private _serviceRootUrl: string = '';
  private http: OHttp = new OHttp();
  constructor(url: string, headers: OHeader[]) {
    this._serviceRootUrl = url;
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


  public getEntitySkipTop(entitySetName: string, skip: string, top: string): Observable<Object> {
    const _url = this._serviceRootUrl + entitySetName + '/?$skip=' + skip + '&$top=' + top;

    var headers: OHeader[]  = [
      {
        key: "accept",
        value: "application/json"
      },
      {
        key: "Authorization",
        value: "Basic REVWRUxPUEVSOmJ1c2luZXNz"
      },
    ];  


    return this.http.get(_url, headers).map(this._entityMap);
  }

}
