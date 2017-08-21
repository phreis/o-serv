import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
export declare class OModel {
    private _baseUrl;
    private http;
    constructor(_url: string);
    private _getResultEntity(obj);
    private _entityMap(response);
    getEntitySkipTop(entitySetName: string, skip: string, top: string): Observable<Object>;
}
