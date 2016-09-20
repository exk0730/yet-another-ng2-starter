import { Http, Response, Request, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Cache } from './cache.service';

/**
 * @class
 * @name BaseService
 * @description
 * Base service that all services should extend. Sets up the headers.
 */
export class BaseService {
    public static POST = RequestMethod.Post;
    public static GET  = RequestMethod.Get;
    public static PUT  = RequestMethod.Put;
    public static DELETE = RequestMethod.Delete;

    private api: string = `${window.location.protocol}//${window.location.hostname}:3000/api`;
    private cache: Cache;

    constructor(public http: Http) {
        this.cache = Cache.instance(http);
    }

    makeRequest(
        options: {method: RequestMethod, url: string, body?: {}},
        cache: boolean = false
    ): Observable<Response> {
        let base = {
            method: options.method,
            url: `${this.api}/${options.url}`,
            withCredentials: true
        };

        let requestOptions = new RequestOptions(
            Object.assign(
                base,
                options.method === BaseService.GET ? {} :  {body: options.body}
            )
        );

        if (cache) {
            return this.cache.wrap(requestOptions);
        }

        return this.http.request(new Request(requestOptions));
    }
}
