import { ConnectionApiService } from './connection-api.service';
import { Injectable, EventEmitter } from '@angular/core';

import { Contact } from './model/contact';

@Injectable({
  providedIn: 'root'
})

export class ListContactsService {

  listContactResponsive: boolean;
  contacts: Contact[] = [];
  // emite evento se a lista é responsiva ou não
  issueEventListContact = new EventEmitter < boolean >();

  //emitir evento quando contato for excluído com id do contato
  issueEventDelete = new EventEmitter< number>();

  //emito evento se o array de contatos é modificado
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
    return dados;
  }

  getContacts() {
    return this.contacts;
  }

  setContacts(dados) {
      this.contacts = this.loadList(dados);
      this.issueEventList.emit(this.contacts);
  }

  deleteContact(id: number) {
    const result = this.contacts.filter( c => c.id === id);
    const pos = this.contacts.indexOf(result[0]);
    this.contacts.splice(pos, 1);
    this.issueEventList.emit(this.contacts);
  }
}
