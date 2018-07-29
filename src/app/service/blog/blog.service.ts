import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { DOMAIN } from '../../interceptor/blog.constant'
import { BlogInterface } from '../../interceptor/blog.interface'


@Injectable()
export class BlogService {

    token: any = localStorage.getItem('token');

    constructor(public http: Http, @Inject(DOMAIN) private domain: BlogInterface) { }

    getBlogList(): Observable<any> {
        return this.http.get(this.domain.DOMAIN + '/blog')
            .catch(this.handleError);

    }

    getBlogDetails(id: any): Observable<any> {
        return this.http.get(this.domain.DOMAIN + '/blog/' + id)
            .catch(this.handleError);

    }

    searchBlog(search: any): Observable<any> {
        return this.http.get(this.domain.DOMAIN + '/blog/search/' + search)
            .catch(this.handleError);

    }


    getPopularBlog(): Observable<any> {
        return this.http.get(this.domain.DOMAIN + '/popular')
            .catch(this.handleError);
    }

    deleteBlog(id): Observable<any> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('token', this.token);
        const options = new RequestOptions({ headers: headers });
        console.log('########', options);
        return this.http.delete(this.domain.DOMAIN + '/blog/' + id, options)
            .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        console.error(error);
        return Observable.throw(error);
    }
}
