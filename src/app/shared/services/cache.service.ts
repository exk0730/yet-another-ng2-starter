import { Http, Response, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class Cache {
    private static _instance: Cache = null;
    private cache: {[key: string]: any} = {};

    constructor(private http: Http) {}

    static instance(http?: Http) {
        if (this._instance === null) {
            this._instance = new Cache(http);
        }
        return this._instance;
    }

    public wrap(requestOptions: RequestOptions): Observable<Response> {
        let key = `${requestOptions.method}_${requestOptions.url}_
                   ${JSON.stringify(requestOptions.body).split('"').join('').trim()}`;

        this.cache[key] = this.cache[key] === undefined ? {
            observable: undefined,
            value: undefined
        } : this.cache[key];

        if (this.cache[key].value) {
            return Observable.of(this.cache[key].value);
        } else if (this.cache[key].observable) {
            return this.cache[key].observable;
        } else {
            this.cache[key] = {};
            let observable: Observable<Response> = this.http.request(new Request(requestOptions));

            observable.subscribe((response: Response) => {
                this.cache[key].observable = null;
                this.cache[key].value = response;
                return response;
            });

            this.cache[key].observable = observable;
            return observable;
        }
    }

    public forceClean() {
        for (let obj in this.cache) {
            if (!this.cache.hasOwnProperty(obj)) {
                continue;
            }

            this.cache[obj] = null;
            delete this.cache[obj];
        }

        this.cache = {};
    }
}
