import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListContactsService } from '../shared/list-contacts.service';

@Component({
  selector: 'app-contato-detalhes',
  templateUrl: './contato-detalhes.component.html',
  styleUrls: ['./contato-detalhes.component.css']
})
export class ContatoDetalhesComponent implements OnInit {

  constructor(private router: Router,
              private listContactService: ListContactsService) {
      this.listContactService.setListContactResponsive(true);
  }

  ngOnInit() {
  }

  editContact() {
    this.listContactService.setListContactResponsive(true);
    this.router.navigate(['/id/edit']);
  }

}
