"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var o_http_1 = require("./o-http");
var o_model_1 = require("./o-model");
var xml2js_1 = require("xml2js");
require("rxjs/add/operator/map");
require("rxjs/add/operator/share");
require("rxjs/add/operator/publishReplay");
var OService = (function () {
    function OService(url, headers) {
        this._serviceRootUrl = '';
        this._metadataBuffer = null;
        this._headers = [
            {
                key: "accept",
                value: "application/json"
            }
        ];
        this.http = new o_http_1.OHttp();
        this._serviceRootUrl = url;
        if (headers)
            this._headers = this._headers.concat(headers);
    }
    ;
    ;
    OService.prototype.get_serviceRootUrl = function () {
        return this._serviceRootUrl;
    };
    OService.prototype.get_headers = function () {
        return this._headers;
    };
    OService.getInstance = function (url, headers) {
        var candidate = this.me.find(function (m) { return m._serviceRootUrl == url; });
        if (!candidate) {
            candidate = new OService(url, headers);
            this.me.push(candidate);
        }
        return candidate;
    };
    OService.prototype.getMetadata = function () {
        if (!this._metadataBuffer) {
            var _url = this._serviceRootUrl + '$metadata';
            this._metadataBuffer = this.http.get(_url).map(this._parseXML).publishReplay(1).refCount();
        }
        return this._metadataBuffer;
    };
    ;
    OService.prototype.getModel = function (resourcePath) {
        return new o_model_1.OModel(this, resourcePath);
    };
    OService.prototype._getResultEntity = function (obj) {
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
    OService.prototype._entityMap = function (response) {
        return this._getResultEntity(JSON.parse(response));
    };
    ;
    OService.prototype._parseXML = function (res) {
        var metadata;
        xml2js_1.parseString(res, function (err, result) {
            metadata = result;
        });
        return metadata;
    };
    OService.prototype.getMetadataPropertiesOfSet = function (entitySetName) {
        var _this = this;
        return this.getMetadata()
            .map(function (md) { return _this.getPropertiesOfSet(md, entitySetName); });
        //            .catch(this.handleError);
    };
    OService.prototype.getPropertiesOfSet = function (f, entitySetName) {
        var sets = this.findElement(f, 'EntitySet');
        var entitySet = sets.filter(function (f) { return f['$']['Name'] === entitySetName; });
        var entityTypeName = entitySet[0]['$']['EntityType'].replace(/.*\.(.*)/, '$1');
        var entityTypes = this.findElement(f, 'EntityType');
        var entityType = entityTypes.filter(function (f) { return f['$']['Name'] === entityTypeName; });
        var properties = entityType[0]['Property'];
        return properties;
    };
    OService.prototype.getEntitySets = function () {
        var _this = this;
        return this.getMetadata()
            .map(function (md) { return _this.findElement(md, 'EntitySet'); });
        //           .catch(this.handleError);
    };
    /**
     * Takes an JSON Object, iterates recursively and returns a single Element named <elementName>
     * Once we have a hit, we do no more drilldown.
     * @param {Object} obj
     * @param {String} elementName
     * @returns {Object}
     */
    OService.prototype.findElement = function (obj, elementName) {
        var _hit = null;
        // tslint:disable-next-line:forin
        for (var i in obj) {
            if (i === elementName) {
                return obj[i];
            }
            if (_hit == null && (Object.prototype.toString.call(obj[i]) === '[object Object]' ||
                Object.prototype.toString.call(obj[i]) === '[object Array]')) {
                _hit = this.findElement(obj[i], elementName);
            }
        }
        return _hit;
    };
    OService.me = [];
    return OService;
}());
exports.OService = OService;
//# sourceMappingURL=o-service.js.map