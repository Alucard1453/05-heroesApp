import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container{
      margin: 10px;
    }
  `]
})
export class HomeComponent {

  get auth(){
    return this.authService.auth;
  }

  constructor( private router: Router,
               private authService: AuthService ){
                console.log(this.auth);
                
               }

  logout(){
    this.authService.logout();
    this.router.navigate(['./auth'], { replaceUrl: true });
    //El "replaceUrl: true" en las opciones borra el stack de navegación y se quede únicamente esa ruta
  }
}
