import { Router } from '@angular/router';
import { Component, OnInit, Input} from '@angular/core';

import { ListContactsService } from '../shared/list-contacts.service';
import { Contact } from './contact';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})

export class ContatoComponent implements OnInit {

  panelOpenState = false;
  @Input() contact: Contact;

  constructor(private router: Router,
              private listContactService: ListContactsService) { }

  ngOnInit() {
  }

  showDetails() {
    this.listContactService.setListContactResponsive(true);
    this.router.navigate(['/id']);
  }

}
