import { OService } from './o-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
export declare class OModel {
    private _resourcePath;
    private http;
    private _service;
    constructor(service: OService, resourcePath: string);
    private _getResultEntity(obj);
    private _entityMap(response);
    getMetadata(): Observable<Object>;
    getEntitySkipTop(skip: string, top: string): Observable<Object>;
    count(): Observable<Object>;
}
