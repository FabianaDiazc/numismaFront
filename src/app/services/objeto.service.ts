import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Objeto } from '../models/objeto';
import { SERVER_URL } from './config';

@Injectable()
export class ObjetoService {
  token: string;

  constructor(public http: Http) {
    this.token = sessionStorage.getItem('token');
  }

  getObjetos(): Observable<Objeto[]> {
    let authUsuarioUrl: string = `${SERVER_URL}/api/objetos/`;
    var headers = new Headers({ 'Content-Type': 'application/json', 
                                'Accept': 'application/json',
                                'Authorization': `Token ${this.token}`
                            });
    var options = new RequestOptions({ headers: headers });
    return this.http.get(authUsuarioUrl, options)
                    .map(response => response.json().results.map(obj => new Objeto(obj)))
  }

  createObjeto(nuevo: Objeto): Observable<Objeto> {
      console.log('voy a mandar');
      console.log(nuevo);
      let createUserUrl: string = `${SERVER_URL}/api/objetos/`;
      var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
      var options = new RequestOptions({ headers: headers });
      return this.http.post(createUserUrl, nuevo, options)
                      .map(response => new Objeto(response.json()))
  }

  private handleError(error: any): Observable<any> {
      console.error('An error occurred', error);
      return Observable.throw(error.message || error);
  }
}