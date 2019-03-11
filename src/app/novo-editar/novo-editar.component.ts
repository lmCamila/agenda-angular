import { ListContactsService } from '../shared/list-contacts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-novo-editar',
  templateUrl: './novo-editar.component.html',
  styleUrls: ['./novo-editar.component.css']
})
export class NovoEditarComponent  {
  title = 'Novo';
  constructor(private route: ActivatedRoute,
              private listContactService: ListContactsService) {
    this.listContactService.setListContactResponsive(true);
    if ( this.route.snapshot.routeConfig.path === 'new') {
      this.title = 'Novo';
    } else {
      this.title = 'Editar';
    }
  }

}
