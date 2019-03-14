import { ContactSimple } from './../shared/model/contac-silmple';
import { Router } from '@angular/router';
import { Component, OnInit, Input} from '@angular/core';

import { ListContactsService } from '../shared/list-contacts.service';
import { Contact } from '../shared/model/contact';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})

export class ContatoComponent implements OnInit {

  panelOpenState = false;
  @Input() contact: ContactSimple;

  constructor(private router: Router,
              private listContactService: ListContactsService) { }

  ngOnInit() {
  }

  showDetails() {
    this.router.navigate([`/${this.contact.id}`]);
  }

}
