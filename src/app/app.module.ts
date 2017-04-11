import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ProgressbarModule, ButtonsModule, AlertModule } from 'ng2-bootstrap';

import { UsuarioService } from './services/usuario-service';
import { ObjetoService } from './services/objeto.service';

import { AppComponent } from './app.component';
import { RectaNumericaComponent } from './components/recta-numerica/recta-numerica';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { MenuComponent } from './components/menu/menu.component';
import { ObjectSelectorComponent } from './components/object-selector/object-selector.component';

const appRoutes: Routes = [
  { path: 'menu', component: MenuComponent },
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
    SignupComponent,
    MenuComponent,
    ObjectSelectorComponent
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
  providers: [
    UsuarioService,
    ObjetoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
