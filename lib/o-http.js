"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var state = "";
;
var OHttp = (function () {
    function OHttp() {
    }
    OHttp.prototype.get = function (url, header) {
        return Observable_1.Observable.create(function (observer) {
            var rq = new XMLHttpRequest();
            rq.addEventListener('progress', function (pe) {
                if (pe.lengthComputable) {
                    /* document.getElementById("monitor").innerHTML = '<p> Progress: ' + Math.floor(pe.loaded / pe.total) * 100 + ' %</p>'; */
                }
            });
            rq.onreadystatechange = function () {
                if (rq.readyState === 4) {
                    if (rq.status === 200) {
                        observer.next(rq.response);
                    }
                    else {
                        observer.error(rq.response);
                    }
                }
            };
            rq.open('GET', url);
            if (header) {
                header.forEach(function (head) {
                    rq.setRequestHeader(head.key, head.value);
                });
            }
            rq.send();
        });
    };
    return OHttp;
}());
exports.OHttp = OHttp;
//# sourceMappingURL=o-http.js.map