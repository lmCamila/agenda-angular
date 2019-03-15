import { Contact } from './model/contact';
import { ConnectionApiService } from './connection-api.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsFavoriteService {

  issueModificationContact = new EventEmitter< Contact >();


  constructor(private connection: ConnectionApiService) { }

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

}
