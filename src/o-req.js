

var Observable = require('rxjs/Observable').Observable;
var state = "";

exports.echo = function (str) {
    console.log(str);
};

exports.state = function () {

    return Observable.create(observer => {
setInterval( () => {observer.next(state); },1000);
    })
}

exports.get = function (url,header) {
    return Observable.create(observer => {
        var rq = new XMLHttpRequest();
        rq.addEventListener('progress', function (pe) {
            if (pe.lengthComputable) {
                /* document.getElementById("monitor").innerHTML = '<p> Progress: ' + Math.floor(pe.loaded / pe.total) * 100 + ' %</p>'; */

            }
        });
        rq.onreadystatechange =  function () {

            if (rq.readyState === 4) {
                setState('finished');
                if (rq.status === 200) {
                    observer.next(rq.response);
                } else {
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
function setState(s) {
this.state = s;

     }
