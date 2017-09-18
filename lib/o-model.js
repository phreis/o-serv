"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var o_http_1 = require("./o-http");
require("rxjs/add/operator/map");
var OModel = (function () {
    function OModel(service, resourcePath) {
        this.http = new o_http_1.OHttp();
        this._resourcePath = resourcePath;
        this._service = service;
    }
    ;
    OModel.prototype._getResultEntity = function (obj) {
        var _hit = null;
        for (var i in obj) {
            if (Object.prototype.toString.call(obj[i]) == '[object Array]') {
                return obj[i];
            }
            if (_hit == null && (Object.prototype.toString.call(obj[i]) == '[object Object]')) {
                _hit = this._getResultEntity(obj[i]);
            }
        }
        return _hit;
    };
    ;
    OModel.prototype._entityMap = function (response) {
        return this._getResultEntity(JSON.parse(response));
    };
    ;
    OModel.prototype.getMetadata = function () {
        //TODO: parse entity set name from resourcePath, somehowkj
        return this._service.getMetadataPropertiesOfSet(this._resourcePath);
    };
    OModel.prototype.getEntitySkipTop = function (skip, top) {
        var _url = this._service.get_serviceRootUrl() + this._resourcePath + '/?$skip=' + skip + '&$top=' + top;
        return this.http.get(_url, this._service.get_headers()).map(this._entityMap, this);
    };
    OModel.prototype.count = function () {
        var _url = this._service.get_serviceRootUrl() + this._resourcePath + '/$count';
        //e.g. Northwind does not like acceptt json for %count 
        //TODO: refactor mybe introduce some 'heda.default' or so...
        var _headers = this._service.get_headers()
            .filter(function (head) { !(head.key == 'accept' && head.value == 'application/json'); });
        return this.http.get(_url, _headers);
    };
    return OModel;
}());
exports.OModel = OModel;
//# sourceMappingURL=o-model.js.map