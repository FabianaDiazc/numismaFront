import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes
 } from '@angular/core';
 import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
})
export class SignupComponent {
    address: AbstractControl;
    first_name: AbstractControl;
    last_name: AbstractControl;
    genero: AbstractControl;
    username: AbstractControl;
    password: AbstractControl;
    password2: AbstractControl;
    submitAttempt: boolean;

    form: FormGroup;
    constructor(formBuilder: FormBuilder,) {
        this.form = formBuilder.group({
        first_name:  ['', Validators.compose([Validators.required])],
        last_name: ['', Validators.compose([Validators.required])],
        genero:    ['', Validators.compose([Validators.required])],
        username:  ['', Validators.compose([Validators.required])],
        password:  ['', Validators.compose([Validators.required])],
        password2: ['', Validators.compose([Validators.required])]
      });
    this.first_name = this.form.controls['first_name'];
    this.last_name = this.form.controls['last_name'];
    this.genero = this.form.controls['genero'];
    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
    this.password2 = this.form.controls['password2'];
    }

    singup() {
        if(this.form.valid) {
            console.log('todo valido');
        } else {
            this.submitAttempt = true;
            console.log('fuck');
        }
    }
}
