import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

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
