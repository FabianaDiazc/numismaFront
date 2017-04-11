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
import { UsuarioService } from '../../services/usuario-service';

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
    submitAttempt: boolean;
    isLoading: boolean;
    form: FormGroup;
    constructor(formBuilder: FormBuilder,
                private router: Router,
                private usuarioService: UsuarioService) 
    {
        this.form = formBuilder.group({
            first_name:  ['', Validators.compose([Validators.required])],
            last_name: ['', Validators.compose([Validators.required])],
            genero:    ['', Validators.compose([Validators.required])],
            username:  ['', Validators.compose([Validators.required])],
            password:  ['', Validators.compose([Validators.required])]
        });
        this.first_name = this.form.controls['first_name'];
        this.last_name = this.form.controls['last_name'];
        this.genero = this.form.controls['genero'];
        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
    }

    ngOnInit() {
        this.isLoading = true;
        this.usuarioService.getAuthCustomer().subscribe(
            (usuario) => {
                this.router.navigate(['/menu']);
                this.isLoading = false;
            },
            (error) => {
                this.isLoading = false;
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
                password: this.password.value
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
