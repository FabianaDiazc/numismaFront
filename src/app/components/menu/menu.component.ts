import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../models/usuario';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoading: boolean;
  usuario: Usuario;
  juegos: { nombre: string, url: string, image: string}[];

  constructor(private usuarioService: UsuarioService,
                private router: Router,) 
  { 
      this.juegos = [
          { nombre: 'Recta Numérica', url: '/recta-numerica', image: '/assets/img/recta-numerica.jpg' },
          { nombre: 'Balanza', url: '/balanza', image: '/assets/img/recta-numerica.jpg' },
           { nombre: 'Recta Numérica Colores', url: '/recta-numerica-colores', image: '/assets/img/recta-numerica.jpg' }
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
                this.isLoading = false;
            },
            (error) => {
                this.router.navigate(['/login']);
            }
        )
    }
  }

  goToRectaNumerica(url) {
      this.router.navigate([url]);
  }

}
