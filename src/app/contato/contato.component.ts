import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ListContactsService } from '../shared/list-contacts.service';
@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  panelOpenState = false;

  constructor(private router: Router,
              private listContactService: ListContactsService) { }

  showDetails() {
    this.listContactService.setListContactResponsive(true);
    this.router.navigate(['/id']);
  }
  ngOnInit() {
  }

}
