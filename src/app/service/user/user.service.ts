import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/throw';

import { DOMAIN } from '../../interceptor/blog.constant'
import { BlogInterface } from '../../interceptor/blog.interface'

@Injectable()
export class UserService {

    constructor(public http: Http, @Inject(DOMAIN) private domain: BlogInterface) { }

    getAllUser(): Observable<any> {

        console.log('inside get creator details');
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.get(this.domain.DOMAIN + '/user', options)
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        console.error(error);
        return Observable.throw(error);
    }
}
