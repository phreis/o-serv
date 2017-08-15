var oreq = require('./o-req.js');
require('rxjs/add/operator/map');
exports.mySingleton = (function () {
  // Instance stores a reference to the Singleton
  var instance;
  function init(url) {
    // Singleton
    // Private methods and variables
    const _baseUrl = url;
    function _entityMap(response) {
      return _getResultEntity(JSON.parse(response));
    };
    function _getResultEntity(obj) {
      let _hit = null;
      for (const i in obj) {
        if (Object.prototype.toString.call(obj[i]) == '[object Array]') {
          return obj[i];
        }
        if (_hit == null && (Object.prototype.toString.call(obj[i]) == '[object Object]')) {
          _hit = _getResultEntity(obj[i]);
        }
      }
      return _hit;
    }


    return {
      // Public methods and variables
      getTransmissionState: function () {

        return oreq.state();
      },

      getEntitySkipTop: function (entitySetName, skip, top) {
        const _url = _baseUrl + entitySetName + '/?$skip=' + skip + '&$top=' + top;

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

        oreq.Observable = oreq.get(_url, header); //.map(_entityMap);
        return oreq.Observable.map(_entityMap);
      }

    };
  };
  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function (url) {
      if (!instance) {
        instance = init(url);
      }
      return instance;
    }
  };
})();