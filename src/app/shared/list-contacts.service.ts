import { ConnectionApiService } from './connection-api.service';
import { Injectable, EventEmitter } from '@angular/core';

import { Contact } from './model/contact';

@Injectable({
  providedIn: 'root'
})

export class ListContactsService {

  listContactResponsive: boolean;
  contacts: Contact[] = [];
  contactsMain: Contact[] = [];
  // emite evento se a lista é responsiva ou não
  issueEventListContact = new EventEmitter < boolean >();
  // emitir evento quando contato for excluído com id do contato
  issueEventDelete = new EventEmitter< number>();
  // emite evento se o array de contatos é modificado
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
    if (this.contactsMain != null) {
      return this.contactsMain;
    } else {
      return this.contacts;
    }
  }

  setContacts(dados) {
      this.contacts = this.loadList(dados);
      this.contactsMain = this.loadList(dados);
      this.issueEventList.emit(this.contacts);
  }

  deleteContact(id: number) {
    const result = this.contacts.filter( c => c.id === id);
    const pos = this.contacts.indexOf(result[0]);
    this.contacts.splice(pos, 1);
    this.contactsMain = this.contacts;
    this.issueEventList.emit(this.contacts);
  }

  searchContact(search) {
    let searchFilter = search;
    searchFilter = searchFilter.replace(new RegExp('(ã|á|à|Ã|À|Á)', 'gi'), 'a');
    searchFilter = searchFilter.replace(new RegExp('(é|è|É|È)', 'gi'), 'e');
    searchFilter = searchFilter.replace(new RegExp('(í|ì|Í|Ì)', 'gi'), 'i');
    searchFilter = searchFilter.replace(new RegExp('(ó|ò|õ|Ò|Ó|Õ)', 'gi'), 'o');
    searchFilter = searchFilter.replace(new RegExp('(ú|ù|Ú|Ù)', 'gi'), 'u');
    searchFilter = searchFilter.replace(new RegExp('(ç|Ç)', 'gi'), 'c');
    const patern = `^${searchFilter}`;
    this.contactsMain = this.contacts.filter(c => new RegExp(patern, 'gi').test(c.firstName));
    this.issueEventList.emit(this.contactsMain);
  }

  filter(isFavorite) {
    if (isFavorite) {
      this.contactsMain = this.contacts.filter(c => c.isFavorite === isFavorite);
      this.issueEventList.emit(this.contactsMain);
    } else {
      this.issueEventList.emit(this.contacts);
    }
  }
}
