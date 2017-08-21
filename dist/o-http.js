"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
var state = "";
;
class OHttp {
    get(url, header) {
        return Observable_1.Observable.create((observer) => {
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
            header.forEach(head => {
                rq.setRequestHeader(head.key, head.value);
            });
            rq.send();
        });
    }
}
exports.OHttp = OHttp;
//# sourceMappingURL=o-http.js.map