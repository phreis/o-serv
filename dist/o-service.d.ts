import { Observable } from 'rxjs/Observable';
import { OHeader } from './o-http';
import 'rxjs/add/operator/map';
export declare class OService {
    private _serviceRootUrl;
    private http;
    constructor(url: string, headers: OHeader[]);
    private _getResultEntity(obj);
    private _entityMap(response);
    getEntitySkipTop(entitySetName: string, skip: string, top: string): Observable<Object>;
}
