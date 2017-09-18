import { Observable } from 'rxjs/Observable';
import { OHeader } from './o-http';
import { OModel } from './o-model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publishReplay';
export declare class OService {
    private static me;
    private _serviceRootUrl;
    private _modelContainer;
    private _metadataBuffer;
    private _headers;
    private http;
    private constructor();
    get_serviceRootUrl(): string;
    get_headers(): OHeader[];
    static getInstance(url: string, headers?: OHeader[]): OService;
    private getMetadata();
    getModel(resourcePath: string): OModel;
    private _getResultEntity(obj);
    private _entityMap(response);
    private _parseXML(res);
    getMetadataPropertiesOfSet(entitySetName: string): Observable<Object>;
    private getPropertiesOfSet(f, entitySetName);
    getEntitySets(): Observable<Object[]>;
    /**
     * Takes an JSON Object, iterates recursively and returns a single Element named <elementName>
     * Once we have a hit, we do no more drilldown.
     * @param {Object} obj
     * @param {String} elementName
     * @returns {Object}
     */
    private findElement(obj, elementName);
}
