import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes,
    OnInit
 } from '@angular/core';
import { Router }  from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { Avatar } from '../../models/avatar';
import { UsuarioService } from '../../services/usuario-service';
import { AvatarService } from '../../services/avatar-service';

@Component({
  selector: 'signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class SignupComponent implements OnInit{
    address: AbstractControl;
    first_name: AbstractControl;
    last_name: AbstractControl;
    genero: AbstractControl;
    username: AbstractControl;
    password: AbstractControl;
    avatarRecta: AbstractControl;
    avatarBalanza: AbstractControl;
    submitAttempt: boolean;
    isLoading: boolean;
    form: FormGroup;
    avatarsRecta: Avatar[];
    avatarsBalanza: Avatar[];
    constructor(formBuilder: FormBuilder,
                private router: Router,
                private usuarioService: UsuarioService,
                private avatarService: AvatarService) 
    {
        this.form = formBuilder.group({
            first_name:  ['', Validators.compose([Validators.required])],
            last_name: ['', Validators.compose([Validators.required])],
            genero:    ['', Validators.compose([Validators.required])],
            username:  ['', Validators.compose([Validators.required])],
            password:  ['', Validators.compose([Validators.required])],
            avatarRecta:  ['', Validators.compose([Validators.required])],
            avatarBalanza:  ['', Validators.compose([Validators.required])]
        });
        this.first_name = this.form.controls['first_name'];
        this.last_name = this.form.controls['last_name'];
        this.genero = this.form.controls['genero'];
        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
        this.avatarRecta = this.form.controls['avatarRecta'];
        this.avatarBalanza = this.form.controls['avatarBalanza'];
    }

    ngOnInit() {
        this.isLoading = true;
        this.usuarioService.getAuthCustomer().subscribe(
            (usuario) => {
                this.router.navigate(['/menu']);
                this.isLoading = false;
            },
            (error) => {
                this.avatarService.getAvatars().subscribe(
                    (avatars) => {
                        this.avatarsRecta = avatars.filter(avatar => avatar.juego == 'RECTA_NUMERICA');
                        this.avatarsBalanza = avatars.filter(avatar => avatar.juego == 'BALANZA');
                        this.isLoading = false;
                    },
                    (error) => {
                        console.log(error);
                        this.isLoading = false;
                    }
                )
                
            }
        )
    }

    singup() {
        if(this.form.valid) {
            let password = this.password.value;
            let nuevo: Usuario = new Usuario({
                username: this.username.value,
                first_name: this.first_name.value,
                last_name: this.last_name.value,
                genero: this.genero.value,
                password: this.password.value,
                avatar_balanza: this.avatarBalanza.value,
                avatar_recta: this.avatarRecta.value
            });
            this.usuarioService.createUser(nuevo).subscribe(
                (usuario) => {
                    this.usuarioService.login(usuario.username, password).subscribe(
                        (token) => {
                            sessionStorage.setItem('token', token);
                            console.log(usuario);
                            this.router.navigate(['/menu']);
                        },
                        (error) => {
                            console.log('error');
                        }
                    )
                    
                },
                (error) => {
                    console.log(error);
                }
            )
        } else {
            this.submitAttempt = true;
        }
    }
}
