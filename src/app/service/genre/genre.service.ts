import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/throw';

import { DOMAIN } from '../../interceptor/blog.constant'
import { BlogInterface } from '../../interceptor/blog.interface'


@Injectable()
export class GenreService {

    constructor(public http: Http, @Inject(DOMAIN) private domain: BlogInterface) { }

    getGenre(): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.domain.DOMAIN + '/genre', options)
            .catch(this.handleError);
    }
    private handleError(error: Response | any) {
        console.error(error);
        return Observable.throw(error);
    }
}
