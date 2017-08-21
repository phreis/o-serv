

import { Observable } from 'rxjs/Observable';
var state = "";

export interface OHeader {
key: string;
value: string;
};

export class OHttp {

public get(url: string,header: any[]): Observable<Object[]> {
    return Observable.create((observer: any) => {
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
        header.forEach(head => {
            rq.setRequestHeader(head.key, head.value);
        });
        rq.send();
    });
}
}
