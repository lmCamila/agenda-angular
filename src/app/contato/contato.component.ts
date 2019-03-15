import { ConnectionApiService } from './../shared/connection-api.service';
import { IsFavoriteService } from './../shared/is-favorite.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input} from '@angular/core';

import { ListContactsService } from '../shared/list-contacts.service';
import { Contact } from './../shared/model/contact';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})

export class ContatoComponent implements OnInit {

  panelOpenState = false;
  @Input() contact: Contact;

  constructor(private router: Router,
              private listContactService: ListContactsService,
              public favoriteService: IsFavoriteService,
              private connection: ConnectionApiService) { }

  ngOnInit() {
  }

  showDetails() {
    this.router.navigate([`/${this.contact.id}`]);
  }

  favoriteClick(event) {
    this.favoriteService.favorite(event.path[2].dataset.id);
  }

}
