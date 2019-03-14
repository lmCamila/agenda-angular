import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListContactsService {

  listContactLength: number;
  listContactResponsive: boolean;

  issueEventListContact = new EventEmitter < boolean > ( );
  changeListLenght = new EventEmitter< number > ( );

  constructor() { }

  setListContactResponsive(isResponsive: boolean) {
    this.listContactResponsive = isResponsive;
    this.issueEventListContact.emit(isResponsive);
  }
  getListContactResponsive(): boolean {
    return this.listContactResponsive;
  }

}
