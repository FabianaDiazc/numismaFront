import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Usuario } from '../models/usuario';
import { SERVER_URL } from './config';

@Injectable()
export class UsuarioService {
  token: string;
  usuario: Usuario;

  constructor(public http: Http) {
    this.token = sessionStorage.getItem('token');
  }

  login(username: string, password: string): Observable<string>{
    let loginUrl: string = `${SERVER_URL}/api/token-auth/`;
    var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
    var options = new RequestOptions({ headers: headers });
    return this.http.post(loginUrl,{
        username: username,
        password: password
    }, options)
    .map(response => {
        this.token = response.json().token;
        sessionStorage.setItem('token', this.token);
        return this.token;
    })
        
  }

  getAuthCustomer(): Observable<Usuario> {
    let authUsuarioUrl: string = `${SERVER_URL}/api/usuario/authenticated/`;
    var headers = new Headers({ 'Content-Type': 'application/json', 
                                'Accept': 'application/json',
                                'Authorization': `Token ${this.token}`
                            });
    var options = new RequestOptions({ headers: headers });
    return this.http.get(authUsuarioUrl, options)
                    .map(response => new Usuario(response.json()))
  }

  createUser(nuevo: Usuario): Observable<Usuario> {
      console.log('voy a mandar');
      console.log(nuevo);
      let createUserUrl: string = `${SERVER_URL}/api/usuarios/`;
      var headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
      var options = new RequestOptions({ headers: headers });
      return this.http.post(createUserUrl, nuevo, options)
                      .map(response => new Usuario(response.json()))
  }

  getToken(): string {
      return this.token;
  }
  getUsuario(): Usuario {
      return this.usuario;
  }

  setUsuario(usuario: Usuario): void {
      this.usuario = usuario;
  }

  private handleError(error: any): Observable<any> {
      console.error('An error occurred', error);
      return Observable.throw(error.message || error);
  }
}