import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { ListContactsService } from '../shared/list-contacts.service';
import { ConnectionApiService } from './../shared/connection-api.service';
import { UpdateService } from '../shared/update.service';
import { PageEvent, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-lista-contatos',
  templateUrl: './lista-contatos.component.html',
  styleUrls: ['./lista-contatos.component.css']
})
export class ListaContatosComponent implements OnInit, OnDestroy, AfterViewInit {
  
  //paginacao
  @ViewChild(MatPaginator) paginator: MatPaginator;
  length: number;
  pageSize = 15;
  //responsividade
  isResponsiveList = false;
  inscriptionResponsive: Subscription;
  //carregar e popular a lista
  inscriptionList: Subscription;
  //mudança em contatos
  inscriptionFavorite: Subscription;
  // display none na lista
  sizeView = window.matchMedia('(max-width: 987px)');
  contacts: any[];

  constructor(private listContactsService: ListContactsService,
              private updateService: UpdateService,
              private apiService: ConnectionApiService) {
    this.sizeView.addListener((event)=>{
      if(event.matches){
        if(document.getElementsByClassName('listContactResponsive')[0]){
          const list = document.getElementsByClassName('listContactResponsive')[0];
          list.classList.remove('listContactResponsive');
          list.classList.add('displayNone');
        }
      }else{
        if(document.getElementsByClassName('displayNone')[0]){
          const list = document.getElementsByClassName('displayNone')[0];
          list.classList.remove('displayNone');
          list.classList.add('listContactResponsive');
        }
      }
    });
  }

  ngOnInit() {
    //inscreve-se no evento de mudança da lista -> colocar este dentro do evento de paginação ?
    this.inscriptionList = this.listContactsService.issueEventList.subscribe(
      (contactList) => {
        this.contacts = contactList.slice(0,15);
        this.length = contactList.length;
      }
    )
    // busca contatos na api -> mudar esse metodo para o service
    this.apiService.list().subscribe(dados => {
      this.listContactsService.setContacts(dados);
    });
    // pega valor boolean do service para verificar se a lista é responsiva 
    this.isResponsiveList = this.listContactsService.getListContactResponsive();
    // se inscreve no evento de responsividade para verificar mudança no estado de responsividade da lista
    this.inscriptionResponsive = this.listContactsService.issueEventListContact.subscribe(isResponsive => {
      this.isResponsiveList = isResponsive;
    });
    // modifica contato favoritado/editado na lista
    this.inscriptionFavorite = this.updateService.issueModificationContact.subscribe( contactResult => {
      const result = this.contacts.filter( c => c.id === contactResult.id);
      const pos = this.contacts.indexOf(result[0]);
      this.contacts.splice(pos, 1, contactResult);
    });
  }
 
  //muda os contatos da lista após os eventos em paginação
  ngAfterViewInit() {
    this.paginator.page.subscribe(
       (event) => {
         this.contacts = this.listContactsService.getContacts().slice((event.pageIndex * event.pageSize),(event.pageIndex * event.pageSize+ event.pageSize))
      }
    );
  }
  ngOnDestroy() {
    this.inscriptionFavorite.unsubscribe();
    this.inscriptionList.unsubscribe();
    this.inscriptionResponsive.unsubscribe();
  }
}
