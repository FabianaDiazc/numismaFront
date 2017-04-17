import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Avatar } from '../models/avatar';
import { SERVER_URL } from './config';

@Injectable()
export class AvatarService {
  token: string;

  constructor(public http: Http) {
    this.token = sessionStorage.getItem('token');
  }

  getAvatars(): Observable<Avatar[]> {
    let authUsuarioUrl: string = `${SERVER_URL}/api/avatars/`;
    var headers = new Headers({ 'Content-Type': 'application/json', 
                                'Accept': 'application/json'
                            });
    var options = new RequestOptions({ headers: headers });
    return this.http.get(authUsuarioUrl, options)
                    .map(response => response.json().results.map(obj => new Avatar(obj)))
  }

  private handleError(error: any): Observable<any> {
      console.error('An error occurred', error);
      return Observable.throw(error.message || error);
  }
}