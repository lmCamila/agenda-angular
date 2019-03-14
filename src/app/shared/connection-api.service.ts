import { ContactSimple } from './model/contac-silmple';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { Contact } from './model/contact';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConnectionApiService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<ContactSimple[]>(environment.apiUrl);
  }

  getContactById(id: number) {
    return this.http.get<Contact>(`${environment.apiUrl}/${id}`).pipe(take(1));
  }

  createContact(contact) {
    const httpConf = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(environment.apiUrl, contact, httpConf).pipe(take(1));
  }
}
