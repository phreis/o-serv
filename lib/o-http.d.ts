import { Observable } from 'rxjs/Observable';
export interface OHeader {
    key: string;
    value: string;
}
export declare class OHttp {
    get(url: string, header?: OHeader[]): Observable<Object>;
}
