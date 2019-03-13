import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Contact } from './../contato/contact';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConnectionApiService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Contact[]>(environment.apiUrl);
  }
}
