import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styles: [
  ]
})
export class ConfirmarComponent {

  //Se inyecta un MatDialogRef, indicando el tipo de componente (si mismo), ademas del decorador
  //@Inject con MAT_DIALOG_DATA, donde es necesario especificar el tipo de data que se recibe
  constructor(public dialogRef: MatDialogRef<ConfirmarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Heroe,){ }

  borrar(){
    this.dialogRef.close(true);
  }

}
