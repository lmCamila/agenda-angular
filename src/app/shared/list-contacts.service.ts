import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListContactsService {

  listContactResponsive: boolean;

  issueEventListContact = new EventEmitter < boolean > ( );

  constructor() { }
  setListContactResponsive(isResponsive: boolean) {
    this.listContactResponsive = isResponsive;
    this.issueEventListContact.emit(isResponsive);
  }
  getListContactResponsive() {
    return this.listContactResponsive;
  }
}
