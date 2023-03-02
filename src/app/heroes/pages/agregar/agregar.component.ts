import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 25px;
    }
  `]
})
export class AgregarComponent implements OnInit{

  @ViewChild('superHero') superHero!: ElementRef<HTMLInputElement>;
  @ViewChild('alter_ego') alter_ego!: ElementRef<HTMLInputElement>;
  @ViewChild('first_appearance') first_appearance!: ElementRef<HTMLInputElement>;
  @ViewChild('characters') characters!: ElementRef<HTMLInputElement>;
  @ViewChild('alt_img') alt_img!: ElementRef<HTMLInputElement>;

  publisher = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor( private heroesService:HeroesService,
               //activatedRoute sirve para tomar los parametros de la url
               private activatedRoute: ActivatedRoute,
               //Router sirve para poder redireccionar a otro path mediante el codigo
               private router: Router,
               private snackBar: MatSnackBar,
               private dialog: MatDialog){}

  ngOnInit(): void {

    //Si en la url no se incluye la palabra editar no es necesario cargar el heroe
    if( !this.router.url.includes('editar') ){
      return;
    }

    this.activatedRoute.params
      .pipe(
        // Este switchMap recibe lo que el observable activatedRoute esta emitiendo
        // Y procede a emitir un nuevo Observable que sera de tipo Heroe
        // este es recibido en subscribe y se procede a igualar el valor de la variable
        switchMap( ({id}) => this.heroesService.getHeroePorId( id ))
      )
      .subscribe( heroe => this.heroe = heroe)
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      this.superHero.nativeElement.focus();
      return;
    }
    if(this.heroe.alter_ego.trim().length === 0){
      this.alter_ego.nativeElement.focus();
      return;
    }
    if(this.heroe.first_appearance.trim().length === 0){
      this.first_appearance.nativeElement.focus();
      return;
    }
    if(this.heroe.characters.trim().length === 0){
      this.characters.nativeElement.focus();
      return;
    }
    if(this.heroe.alt_img!.trim().length === 0){
      this.alt_img.nativeElement.focus();
      return;
    }

    if( this.heroe.id ){
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe( heroe => {
        this.mostrarSnakBar('Registro actualizado');
        console.log('Actualizando: ',heroe);
      })
    }else{
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe( heroe => {
          this.mostrarSnakBar('Registro creado');
          this.router.navigate(['/heroes/editar', heroe.id]);
        })
    }
  }

  borrarHeroe(){

    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '300px',
      data: {... this.heroe}
    });

    dialog.afterClosed().subscribe( result => {
      console.log(result);
      if(result){
        this.heroesService.borrarHeroe( this.heroe.id! )
          .subscribe( resp => {
            this.router.navigate(['/heroes']);
          })
      }
    })

  }

  mostrarSnakBar( mensaje: string ): void{
    this.snackBar.open( mensaje, 'Cerrar', {
      duration: 2500
    })
  }
}
