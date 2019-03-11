import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListContactsService } from '../shared/list-contacts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.css']
})
export class ListaContatosComponent implements OnInit, OnDestroy {

  isResponsiveList = false;
  inscription: Subscription;
  constructor(private listContactsService: ListContactsService) { }

  ngOnInit() {
    this.isResponsiveList = this.listContactsService.getListContactResponsive();
    this.inscription = this.listContactsService.issueEventListContact.subscribe(isResponsive => {
      this.isResponsiveList = isResponsive;
    });
  }

  ngOnDestroy() {
    this.inscription.unsubscribe();
  }
}
