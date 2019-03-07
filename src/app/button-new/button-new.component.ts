import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ButtonNovoEditarComponent } from './button-novo-editar.component';

@Component({
  selector: 'app-button-new',
  templateUrl: './button-new.component.html',
  styleUrls: ['./button-new.component.css']
})
export class ButtonNewComponent implements OnInit {
  dialogRef: MatDialogRef<ButtonNovoEditarComponent>;
  constructor(public dialog: MatDialog) { }
  openDialogNew(): void {
  this.dialogRef = this.dialog.open(ButtonNovoEditarComponent);

  }
  ngOnInit() {
  }
}


