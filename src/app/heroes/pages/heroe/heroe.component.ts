import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router){ }

  ngOnInit(): void {
    //Uso de destructuracion del objeto para tomar solo su id
    this.activatedRoute.params
    .pipe(
      // Este switchMap recibe lo que el observable activatedRoute esta emitiendo
      // Y procede a emitir un nuevo Observable que sera de tipo Heroe
      // este es recibido en subscribe y se procede a igualar el valor de la variable
      switchMap( ({ id }) => this.heroesService.getHeroePorId(id) )
    )
    .subscribe( heroe => this.heroe = heroe );
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
