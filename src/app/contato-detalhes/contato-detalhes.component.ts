import { ConnectionApiService } from './../shared/connection-api.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ListContactsService } from '../shared/list-contacts.service';
import { Contact } from '../shared/model/contact';

@Component({
  selector: 'app-contato-detalhes',
  templateUrl: './contato-detalhes.component.html',
  styleUrls: ['./contato-detalhes.component.css']
})
export class ContatoDetalhesComponent implements OnInit, OnDestroy {

  inscriptionUrl: Subscription;
  inscriptionApi: Subscription;
  contact: Contact;
  constructor(private router: Router,
              private listContactService: ListContactsService,
              private connection: ConnectionApiService,
              private activatedRoute: ActivatedRoute) {
      // seta atributo de responsividade no serviço de lista de contatos
      this.listContactService.setListContactResponsive(true);

  }

  ngOnInit() {
    // pegar atributo de url
    this.inscriptionUrl = this.activatedRoute.params.subscribe(
      (params: any) => {
          const id = 'id';
          const c$ =  this.connection.getContactById(params[id]);
          c$.subscribe(contactById => {
            console.log(contactById);
            this.contact = contactById;
          });
      }
    );
  }

  editContact() {
    this.router.navigate([`/${this.contact.id}/edit`]);
  }

  ngOnDestroy() {
    this.inscriptionUrl.unsubscribe();
  }

}
