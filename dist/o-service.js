"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const o_http_1 = require("./o-http");
require("rxjs/add/operator/map");
class OService {
    constructor(url, headers) {
        this._serviceRootUrl = '';
        this.http = new o_http_1.OHttp();
        this._serviceRootUrl = url;
    }
    ;
    _getResultEntity(obj) {
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
    }
    ;
    _entityMap(response) {
        return this._getResultEntity(JSON.parse(response));
    }
    ;
    getEntitySkipTop(entitySetName, skip, top) {
        const _url = this._serviceRootUrl + entitySetName + '/?$skip=' + skip + '&$top=' + top;
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
        return this.http.get(_url, header).map(this._entityMap, this);
    }
}
exports.OService = OService;
//# sourceMappingURL=o-service.js.map