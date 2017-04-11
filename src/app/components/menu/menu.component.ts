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

  constructor(private usuarioService: UsuarioService,
                private router: Router,) 
  { }

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

  goToRectaNumerica() {
      this.router.navigate(['/recta-numerica']);
  }

}
