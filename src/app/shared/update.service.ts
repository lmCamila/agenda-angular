import { MatDialog, MatDialogRef } from '@angular/material';
import { Injectable, EventEmitter } from '@angular/core';

import { Contact } from './model/contact';
import { ConnectionApiService } from './connection-api.service';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  issueModificationContact = new EventEmitter< Contact >();
  dialogModal: MatDialogRef<DialogModalComponent>;

  constructor(private connection: ConnectionApiService,
              private dialog: MatDialog) { }

  favorite(id) {
    this.connection.getContactById(id).subscribe(contact => {
      this.connection.favorite(contact).subscribe(() => {
        this.connection.getContactById(id).subscribe(dados => {
          this.issueModificationContact.emit(dados);
        });
      }
      );
    });
  }
  update(id,value){
    this.connection.update(id,value).subscribe(
      success => {
        this.dialogModal = this.dialog.open(DialogModalComponent, {
          data: {
            message: 'Contato alterado com sucesso!',
            cancelar: false
          }
        });
        this.connection.getContactById(id).subscribe(
          contact => this.issueModificationContact.emit(contact)
          );
      },
      error =>this.dialogModal = this.dialog.open(DialogModalComponent, {
        data: {
          message: 'Erro, contato não pode ser inserido!',
          cancelar: false
        }
      }))
  }
}
