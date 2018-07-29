import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/throw';

import { DOMAIN } from '../../interceptor/blog.constant'
import { BlogInterface } from '../../interceptor/blog.interface'

@Injectable()
export class SignupService {

  constructor(public http: Http, @Inject(DOMAIN) private domain: BlogInterface) { }

  signup(user: any): Observable<any> {
    console.log('Inside service', user)
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post( this.domain.DOMAIN +'/user/signup', user, options)
      .catch(this.handleError);
  }
  private handleError(error: Response | any) {
    console.error(error);
    return Observable.throw(error);
  }

}
