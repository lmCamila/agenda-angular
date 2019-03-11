import { Component, OnInit } from '@angular/core';
import { ListContactsService } from '../list-contacts.service';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.css']
})
export class ListaContatosComponent implements OnInit {

  isResponsiveList: boolean;

  constructor(private listContactsService: ListContactsService) { }

  ngOnInit() {
    this.isResponsiveList = this.listContactsService.getListContactResponsive();
    this.listContactsService.issueEventListContact.subscribe(isResponsive=>{
      this.isResponsiveList = isResponsive;
    });
  }

}
