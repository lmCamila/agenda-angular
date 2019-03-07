import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-novo-editar',
  templateUrl: './novo-editar.component.html'
})
export class NovoEditarComponent  {

  constructor( public dialogRef: MatDialogRef<NovoEditarComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
