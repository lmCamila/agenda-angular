import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, map } from 'rxjs/operators';

import { Contact } from './model/contact';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConnectionApiService {
  httpConf = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Contact[]>(environment.apiUrl);
  }

  getContactById(id: number) {
    return this.http.get<Contact>(`${environment.apiUrl}/${id}`).pipe(take(1));
  }

  createContact(contact) {
    return this.http.post(environment.apiUrl, contact, this.httpConf).pipe(take(1));
  }

  update(id,contact) {
    return this.http.put(`${environment.apiUrl}/${id}`, contact, this.httpConf).pipe(take(1));
  }
  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/${id}`).pipe(take(1));
  }

  favorite(contact: Contact) {
    console.log(contact.isFavorite);
    const body = {
      firstName : contact.firstName,
      lastName : contact.lastName,
      avatar : contact.info.avatar,
      email : contact.email,
      gender: contact.gender,
      isFavorite: !contact.isFavorite,
      company: contact.info.company,
      address: contact.info.address,
      phone: contact.info.phone,
      comments: contact.info.comments
     };
    console.log(body.isFavorite);
    console.log(`${environment.apiUrl}/${contact.id}`);
    return this.http.put(`${environment.apiUrl}/${contact.id}`, body).pipe(take(1));

    }
}
