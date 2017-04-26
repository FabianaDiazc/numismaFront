import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';

import { UsuarioService } from '../../services/usuario-service';
import { NivelService } from '../../services/nivel-service';
import { Usuario } from '../../models/usuario';
import { Puntaje } from '../../models/puntaje';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoading: boolean;
  usuario: Usuario;
  puntajes: Puntaje[];
  juegos: { nombre: string, name: string, url: string, image: string}[];

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private nivelService: NivelService) 
  { 
      this.juegos = [
          { nombre: 'Recta Numérica', name: 'RECTA_NUMERICA',  url: '/recta-numerica', image: '/assets/img/recta-numerica.jpg' },
          { nombre: 'Balanza', name: 'BALANZA', url: '/balanza', image: '/assets/img/recta-numerica.jpg' },
          { nombre: 'Recta Numérica Colores', name: 'RECTA_NUMERICA_COLOR', url: '/recta-numerica-colores', image: '/assets/img/recta-numerica.jpg' }
      ]
  }

  ngOnInit() {
    this.isLoading = true;
    let token = this.usuarioService.getToken();
    if(!token) {
        this.router.navigate(['/login']);
    } else { 
        this.usuarioService.getAuthCustomer().subscribe(
            (usuario) => {
                this.usuarioService.setUsuario(usuario);
                this.usuario = usuario;
                console.log(this.usuario);
                this.nivelService.getPuntajesJuegoActual().subscribe(
                    (puntajes) => { 
                        this.puntajes = puntajes; 
                        console.log(this.puntajes);
                        this.isLoading = false;
                    },
                    (error) => { 
                        console.log(error); 
                        this.isLoading = false;
                    }
                );
                
            },
            (error) => {
                this.router.navigate(['/login']);
            }
        )
    }
  }

  goToGame(url: string, nivel: number) {
      this.router.navigate([url, nivel]);
    //   this.router.navigate([url, { puntajes: this.puntajes }]);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isDisabled(juego, tipo: string): boolean {
    let puntaje = this.puntajes.filter(puntaje => puntaje.nivel.tipo == tipo && puntaje.nivel.nombre == juego.name);
    if(puntaje[0].estado == "BLOQUEADO")
        return true;
    else
        return false;
  }
}
