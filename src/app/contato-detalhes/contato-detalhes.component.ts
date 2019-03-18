import { DialogModalService } from './../shared/dialog-modal/dialog-modal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ListContactsService } from '../shared/list-contacts.service';
import { Contact } from '../shared/model/contact';
import { ConnectionApiService } from './../shared/connection-api.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { DialogModalComponent } from '../shared/dialog-modal/dialog-modal.component';
import { UpdateService } from '../shared/update.service';

@Component({
  selector: 'app-contato-detalhes',
  templateUrl: './contato-detalhes.component.html',
  styleUrls: ['./contato-detalhes.component.css']
})
export class ContatoDetalhesComponent implements OnInit, OnDestroy {

  inscriptionUrl: Subscription;
  inscriptionFav: Subscription;
  inscriptionDialog: Subscription;
  contact: Contact;
  confirmDelete: boolean;

  dialogModal: MatDialogRef<DialogModalComponent>;

  constructor(private dialog: MatDialog,
              private listContactService: ListContactsService,
              private connection: ConnectionApiService,
              private dialogModalService: DialogModalService,
              private updateService: UpdateService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
      // seta atributo de responsividade no serviço de lista de contatos
      this.listContactService.setListContactResponsive(true);

  }

  ngOnInit() {
    // pegar atributo de url
    this.inscriptionUrl = this.activatedRoute.params.subscribe(
      (params: any) => {
          const id = 'id';
          const c$ =  this.connection.getContactById(params[id]);
          c$.subscribe(contactById => {
            this.contact = contactById;
          });
      }
    );
    //evento de update isFavorite
    this.inscriptionFav = this.updateService.issueModificationContact.subscribe(
      contactResult => this.contact = contactResult
    )
  }

  editContact() {
    this.router.navigate([`/${this.contact.id}/edit`]);
  }

  deleteContact() {
    this.dialogModal = this.dialog.open(DialogModalComponent, {
      data: { message: `Deseja realmente excluir ${this.contact.firstName} ${this.contact.lastName} ?`,
              cancelar: true}
    });
    this.inscriptionDialog = this.dialogModalService.eventMessageDialog.subscribe( confirm => {
        if(confirm == true){
          this.connection.delete(this.contact.id).subscribe(
            success => {
              this.dialogModal = this.dialog.open(DialogModalComponent, {
              data: { message: `Contato excluído com sucesso!`,
                      cancelar: false}
              });
              this.listContactService.deleteContact(this.contact.id);
          },
            error => this.dialogModal = this.dialog.open(DialogModalComponent, {
              data: { message: `Erro, contato não pode excluído!`,
                      cancelar: false}
            })
          );
        }
      } );
    this.deleteContact = null;
  }
  favoriteClick() {
      this.updateService.favorite(this.contact.id); 
  }

  ngOnDestroy() {
    if(this.inscriptionUrl){
      this.inscriptionUrl.unsubscribe();
    }
    if(this.inscriptionDialog){
      this.inscriptionDialog.unsubscribe();
    }
    if(this.inscriptionFav){
      this.inscriptionFav.unsubscribe();
    }
  }

  
}
