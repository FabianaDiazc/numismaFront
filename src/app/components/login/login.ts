import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes
 } from '@angular/core';
import { Router }  from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario-service';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
    username: AbstractControl;
    password: AbstractControl;
    submitAttempt: boolean;
    errorLogin: boolean;

    form: FormGroup;
    constructor(formBuilder: FormBuilder,
                private router: Router,
                private usuarioService: UsuarioService) 
    {
        this.errorLogin = false;
        this.form = formBuilder.group({
            username:  ['', Validators.compose([Validators.required])],
            password:  ['', Validators.compose([Validators.required])]
        });
        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
    }

    login() {
        if(this.form.valid) {
            this.usuarioService.login(this.username.value, this.password.value).subscribe(
                (data) => {
                    this.router.navigate(['/recta-numerica']);
                },
                (error) => {
                    console.log(error);
                    this.errorLogin = true;
                }
            )
        } else {
            this.submitAttempt = true;
        }
    }
}
