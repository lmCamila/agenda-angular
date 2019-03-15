import { ConnectionApiService } from './connection-api.service';
import { Injectable, EventEmitter } from '@angular/core';

import { Contact } from './model/contact';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ListContactsService {

  listContactResponsive: boolean;
  contacts: Contact[] = [];
  inscription: Subscription;
  issueEventListContact = new EventEmitter < boolean >();
  issueEventList = new EventEmitter < Contact[] >();

  constructor(private connection: ConnectionApiService) { }

  setListContactResponsive(isResponsive: boolean) {
    this.listContactResponsive = isResponsive;
    this.issueEventListContact.emit(isResponsive);
  }

  getListContactResponsive(): boolean {
    return this.listContactResponsive;
  }

  loadList(dados) {
    dados.sort((a, b) => {
        if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
          return 1;
        }
        if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
          return -1;
        }
        return 0;
      });
    this.setContacts(dados);
    return dados;
  }
  getContacts() {
    return this.contacts;
  }
  setContacts(dados) {
    this.contacts = dados;
  }
}
