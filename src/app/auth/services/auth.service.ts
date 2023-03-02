import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { Observable, tap, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth: Auth | undefined;
  private _baseUrl: string = environment.basePath;

  get auth(){
    //Se desestructura para evitar que se pueda cambiar el valor desde algun otro modulo
    //ya que javascript todos los valores se pasan por referencia
    return { ...this._auth };
  }

  constructor( private http: HttpClient ) { }
  
  login(): Observable<Auth>{
    return this.http.get<Auth>(`${ this._baseUrl }/usuarios/1`)
      .pipe(
        //El operador tap es utilizado para generar efectos secundarios, es decir, cuando
        //se haga la peticion antes de llegar al subscribe consumido en login.component.ts
        //pasara por el tap
        tap( auth => this._auth = auth),
        //El auth siempre va a recibir el producto del operador anterior
        tap( auth => localStorage.setItem('token', auth.id))
      );
  }

  //Se hace un logout borrando el objeto para evitar que el usuario pueda regresar a rutas donde 
  //el modulo ya ha sido cargado por uso previo, de no hacerlo aun con la implementacion de canMatch
  //el usuario podria activar las rutas sin estar logueado.
  logout(): void{
    this._auth = undefined;
    localStorage.removeItem('token');
  }

  verificaAutenticacion(): Observable<boolean> {
    console.log('validado');
    //of sirve para crear un observable de lo que se reciba
    if(!localStorage.getItem('token')){
      return of(false);
    }

    //map sirve para transformar lo que se reciba del operador anterior y transformarlo
    //y a su vez retornar un nuevo valor
    return this.http.get<Auth>(`${ this._baseUrl }/usuarios/1`)
      .pipe(
        map(auth  => {
          console.log('map: ', auth);
          if( auth ){
            this._auth = auth;
            return true;
          }else{
            return false;
          }
        })
      );
  }
}
