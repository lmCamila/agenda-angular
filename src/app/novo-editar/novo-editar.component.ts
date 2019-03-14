import { ConnectionApiService } from './../shared/connection-api.service';
import { Subscription } from 'rxjs';
import { ListContactsService } from '../shared/list-contacts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Contact } from '../shared/model/contact';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-novo-editar',
  templateUrl: './novo-editar.component.html',
  styleUrls: ['./novo-editar.component.css']
})
export class NovoEditarComponent implements OnInit {
  title = 'Novo';
  matcher = new MyErrorStateMatcher();
  formulario: FormGroup;
  inscriptionUrl: Subscription;
  idContact: number;


  constructor(private route: ActivatedRoute,
              private listContactService: ListContactsService,
              private connection: ConnectionApiService,
              private formBuilder: FormBuilder) {

    this.listContactService.setListContactResponsive(true);
  }

  ngOnInit() {
    // verifica rota e carrega se necessário contato
    if (this.route.snapshot.routeConfig.path === 'new') {
      this.title = 'Novo';
    } else {
      this.title = 'Editar';
    }
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3)]],
      sobrenome: [null, [Validators.required, Validators.minLength(3)]],
      avatar: [null],
      email: [null, [Validators.required, Validators.email]],
      telefone: [null, [Validators.required, Validators.minLength(3)]],
      endereco: [null, [Validators.required, Validators.minLength(3)]],
      genero: ['f', Validators.required],
      empresa: [null, [Validators.required, Validators.minLength(3)]],
      comentarios: [null]
    });
    this.inscriptionUrl = this.route.params.subscribe(
      (params: any) => {
          const id = 'id';
          this.idContact = params[id];
          const c$ =  this.connection.getContactById(params[id]);
          c$.subscribe(contactById => {
            this.fillForm(contactById);
          });
      }
    );
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario);
    } else {
      console.log('formulário invalido');
    }
   }

  resetForm() {
    this.formulario.reset();
  }

  fillForm(dados: Contact) {
    this.formulario.patchValue({
      nome: dados.firstName,
      sobrenome: dados.lastName,
      avatar: null,
      email: dados.email,
      telefone: dados.info.phone,
      endereco: dados.info.address,
      genero: dados.gender,
      empresa: dados.info.company ,
      comentarios: dados.info.comments
    });
  }

}
