  var oreq = require('./o-req.js');
  exports.mySingleton = (function () {
  // Instance stores a reference to the Singleton
  var instance;
  function init(url) {
    // Singleton
    // Private methods and variables
    function privateMethod(){
        console.log( "I am private" );
    }
    var _url = url;
    
    var privateRandomNumber = Math.random();
    return {
      // Public methods and variables
      publicMethod: function () {
        console.log( "The public can see me!" );
      },
      publicProperty: "I am also public",
      getRandomNumber: function() {
        return privateRandomNumber;
      },
    getEntitySkipTop: function(entitySetName,skip,top) {
return oreq.fetch(_url);
    }
    };
  };
  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function (url) {
      if ( !instance ) {
        instance = init(url);
      }
      return instance;
    }
  };
})();