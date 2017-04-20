import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Puntaje } from '../models/puntaje';
import { SERVER_URL } from './config';

@Injectable()
export class NivelService {
  token: string;

  constructor(public http: Http) {
    this.token = sessionStorage.getItem('token');
  }

  getPuntajesJuegoActual(): Observable<Puntaje[]> {
    this.token = sessionStorage.getItem('token');
    let authUsuarioUrl: string = `${SERVER_URL}/api/niveles/juego/actual/`;
    var headers = new Headers({ 'Content-Type': 'application/json', 
                                'Accept': 'application/json',
                                'Authorization': `Token ${this.token}`
                            });
    var options = new RequestOptions({ headers: headers });
    return this.http.get(authUsuarioUrl, options)
                    .map(response => response.json().map(obj => new Puntaje(obj)))
  }

  terminarNivel(puntaje: Puntaje) {
    this.token = sessionStorage.getItem('token');
    let authUsuarioUrl: string = `${SERVER_URL}/api/puntajes/${puntaje.id}/`;
    var headers = new Headers({ 'Content-Type': 'application/json', 
                                'Accept': 'application/json',
                                'Authorization': `Token ${this.token}`
                            });
    var body = { estado: 'FINALIZADO' };
    var options = new RequestOptions({ headers: headers });
    return this.http.put(authUsuarioUrl, body, options)
                    .map(response => response.json())
  }

  actualizarNivel(puntaje: Puntaje) {
    this.token = sessionStorage.getItem('token');
    let authUsuarioUrl: string = `${SERVER_URL}/api/puntajes/${puntaje.id}/`;
    var headers = new Headers({ 'Content-Type': 'application/json', 
                                'Accept': 'application/json',
                                'Authorization': `Token ${this.token}`
                            });
    var body = { estado: 'EN_PROGRESO' };
    var options = new RequestOptions({ headers: headers });
    return this.http.put(authUsuarioUrl, body, options)
                    .map(response => response.json())
  }

  private handleError(error: any): Observable<any> {
      console.error('An error occurred', error);
      return Observable.throw(error.message || error);
  }
}