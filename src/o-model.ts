import { Observable } from 'rxjs/Observable';
import { ORequest } from './o-req';

import 'rxjs/add/operator/map';

export class OModel {
  private _baseUrl: string = '';
  private oreq: ORequest;
  constructor(_url: string) {
    this._baseUrl = _url;
    this.oreq = new ORequest();
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
    const _url = this._baseUrl + entitySetName + '/?$skip=' + skip + '&$top=' + top;

    var header = [
      {
        key: "accept",
        value: "application/json"
      },
      {
        key: "Authorization",
        value: "Basic REVWRUxPUEVSOmJ1c2luZXNz"
      },
    ];

    return this.oreq.get(_url, header).map(this._entityMap,this);
  }

}
