import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ProgressbarModule, ButtonsModule, AlertModule } from 'ng2-bootstrap';
import { AppComponent } from './app.component';
import { RectaNumericaComponent } from './components/recta-numerica/recta-numerica';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';

const appRoutes: Routes = [
  { path: 'recta-numerica', component: RectaNumericaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SignupComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    RectaNumericaComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
