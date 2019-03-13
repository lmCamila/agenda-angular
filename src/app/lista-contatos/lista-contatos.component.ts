import { ConnectionApiService } from './../shared/connection-api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ListContactsService } from '../shared/list-contacts.service';
import { Contact } from './../contato/contact';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.css']
})
export class ListaContatosComponent implements OnInit, OnDestroy {

  isResponsiveList = false;
  inscription: Subscription;
  inicio = 0;
  fim = 15;
  contacts: any[];

  constructor(private listContactsService: ListContactsService,
              private apiService: ConnectionApiService) { }

  ngOnInit() {
    this.apiService.list().subscribe((dados) => {
      dados = dados.sort((a, b) => {
        if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
          return 1;
        }
        if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
          return -1;
        }
        return 0;
      });
      this.contacts = dados.splice(0, 15) ;
    });

    this.isResponsiveList = this.listContactsService.getListContactResponsive();

    this.inscription = this.listContactsService.issueEventListContact.subscribe(isResponsive => {
      this.isResponsiveList = isResponsive;
    });
  }

  ngOnDestroy() {
    this.inscription.unsubscribe();
  }

}
