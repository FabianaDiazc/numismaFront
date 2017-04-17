import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { ProgressbarModule, ButtonsModule, AlertModule, ModalModule } from 'ng2-bootstrap';

import { UsuarioService } from './services/usuario-service';
import { ObjetoService } from './services/objeto.service';
import { AvatarService } from './services/avatar-service';

import { AppComponent } from './app.component';
import { RectaNumericaComponent } from './components/recta-numerica/recta-numerica';
import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { MenuComponent } from './components/menu/menu.component';
import { ObjectSelectorComponent } from './components/object-selector/object-selector.component';
import { BalanzaComponent } from './components/balanza/balanza';
import { RectaNumericaColoresComponent } from './components/recta-numerica-colores/recta-numerica-colores';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: SignupComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'recta-numerica', component: RectaNumericaComponent },
  { path: 'balanza', component: BalanzaComponent },
  { path: 'recta-numerica-colores', component: RectaNumericaColoresComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    RectaNumericaComponent,
    LoginComponent,
    SignupComponent,
    MenuComponent,
    ObjectSelectorComponent,
    BalanzaComponent,
    RectaNumericaColoresComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ProgressbarModule.forRoot(),
    ButtonsModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    UsuarioService,
    ObjetoService,
    AvatarService,
    BalanzaComponent,
    RectaNumericaColoresComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
