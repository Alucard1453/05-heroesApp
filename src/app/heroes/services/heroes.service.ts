import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl:string = environment.basePath;

  constructor( private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes`);
  }

  getHeroePorId( id: string ): Observable<Heroe>{
    return this.http.get<Heroe>(`${ this.baseUrl }/heroes/${id}`);
  }

  getSugerencias( termino: string ): Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes?q=${ termino }&_limit=5`);
  }
}
//Para usar el servicio es necesario importar el HttpClientModule en app.module.ts ya que se encuentra
//declarado de manera global