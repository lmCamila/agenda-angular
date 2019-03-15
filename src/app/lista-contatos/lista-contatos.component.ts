import { Contact } from './../shared/model/contact';
import { IsFavoriteService } from './../shared/is-favorite.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ListContactsService } from '../shared/list-contacts.service';
import { ConnectionApiService } from './../shared/connection-api.service';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.css']
})
export class ListaContatosComponent implements OnInit, OnDestroy {

  isResponsiveList = false;
  inscription: Subscription;
  inscriptionList: Subscription;
  inicio = 0;
  fim = 15;
  contacts: any[];

  constructor(private listContactsService: ListContactsService,
              private isFavoriteService: IsFavoriteService,
              private apiService: ConnectionApiService) { }

  ngOnInit() {
    this.inscription = this.apiService.list().subscribe(dados => {
      this.contacts = this.listContactsService.loadList(dados).splice(0, 15);
    });

 // colocar somente quantidade x de contatos na tela : array.splice(0, 15)
    this.isResponsiveList = this.listContactsService.getListContactResponsive();

    this.inscription = this.listContactsService.issueEventListContact.subscribe(isResponsive => {
      this.isResponsiveList = isResponsive;
    });

    this.inscriptionList = this.isFavoriteService.issueModificationContact.subscribe( contactResult => {
      const result = this.contacts.filter( c => c.id === contactResult.id);
      const pos = this.contacts.indexOf(result[0]);
      this.contacts.splice(pos, 1, contactResult);
    });
  }

  ngOnDestroy() {
    this.inscription.unsubscribe();
    this.inscriptionList.unsubscribe();
  }

}
