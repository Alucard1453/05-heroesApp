import { inject, NgModule } from '@angular/core';
import { Route, RouterModule, Routes, UrlSegment } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthService } from './auth/services/auth.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( module => module.AuthModule )
    //Para que funcione la carga perezosa de utiliza la funcion loadChildren, la cual a traves 
    //de una funcion flecha carga los hijos, en parentesis se indica el path del modulo que
    //nos interesa, al ser una promesa, cuando se resuelve (then) carga ese respectivo modulo
  },
  {
    path: 'heroes',
    //canMatch se implemento a partir de Angular 14, los guards actualmente estan deprecados
    //su comportamiento es una combinacion de CanLoad + CanActivate, en este caso se inyecta el
    //servicio que utilizamos para autenticar al usuario, si la propiedad funcion verificaAutenticacion
    //devuelve true el usuario esta logueado, caso contrario regresara false redireccionando
    //al usuario fuera de las rutas protegidas
    canMatch: [(route: Route, segments: UrlSegment[]) =>{
      const isAuth = inject(AuthService).verificaAutenticacion();
      console.log('Valor validado: ', isAuth);
      return isAuth;
    }],
    loadChildren: () => import('./heroes/heroes.module').then( module => module.HeroesModule )
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
