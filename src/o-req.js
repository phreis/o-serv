

var Observable = require('rxjs/Observable').Observable;


exports.echo = function (str) {
    console.log(str);
};
exports.fetch = function (url) {
    return Observable.create(observer => {
        var rq = new XMLHttpRequest();
        rq.addEventListener('progress', function (pe) {
            if (pe.lengthComputable) {
                /* document.getElementById("monitor").innerHTML = '<p> Progress: ' + Math.floor(pe.loaded / pe.total) * 100 + ' %</p>'; */

            }
        });
        rq.onreadystatechange =  function () {

            if (rq.readyState === 4) {
                if (rq.status === 200) {
                    observer.next(rq.response);
                } else {
                    observer.error(rq.response);
                }
            }
        };
        rq.open('GET', url);
        rq.send();
    });
}