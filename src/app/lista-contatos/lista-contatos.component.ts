import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ListContactsService } from '../shared/list-contacts.service';
import { ConnectionApiService } from './../shared/connection-api.service';
import { UpdateService } from '../shared/update.service';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.css']
})
export class ListaContatosComponent implements OnInit, OnDestroy {

  isResponsiveList = false;
  inscription: Subscription;
  inscriptionFavorite: Subscription;
  inscriptionList: Subscription;
  inscriptionResponsive: Subscription;
  inicio = 0;
  fim = 15;
  contacts: any[];

  constructor(private listContactsService: ListContactsService,
              private updateService: UpdateService,
              private apiService: ConnectionApiService) { }

  ngOnInit() {
    //inscreve-se no evento de mudança da lista -> colocar este dentro do evento de paginação ?
    this.inscriptionList = this.listContactsService.issueEventList.subscribe(
      (contactList) => {
        this.contacts = contactList.slice(0,15);
      }
    )
    // busca contatos na api -> mudar esse metodo para o service
    this.inscription = this.apiService.list().subscribe(dados => {
      this.listContactsService.setContacts(dados);
      // this.contacts = this.listContactsService.loadList(dados).splice(0, 15);
    });

    // pega valor boolean do service para verificar se a lista é responsiva 
    this.isResponsiveList = this.listContactsService.getListContactResponsive();

    // se inscreve no evento de responsividade para verificar mudança no estado de responsividade da lista
    this.inscriptionResponsive = this.listContactsService.issueEventListContact.subscribe(isResponsive => {
      this.isResponsiveList = isResponsive;
    });

    // modifica contato favoritado/editado na lista
    this.inscriptionFavorite = this.updateService.issueModificationContact.subscribe( contactResult => {
      const result = this.contacts.filter( c => c.id === contactResult.id);
      const pos = this.contacts.indexOf(result[0]);
      this.contacts.splice(pos, 1, contactResult);
    });

    
  }

  ngOnDestroy() {
    this.inscription.unsubscribe();
    this.inscriptionFavorite.unsubscribe();
    this.inscriptionList.unsubscribe();
    this.inscriptionResponsive.unsubscribe();
  }

}
