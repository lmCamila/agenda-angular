import { ConnectionApiService } from './../shared/connection-api.service';
import { Subscription } from 'rxjs';
import { ListContactsService } from '../shared/list-contacts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Contact } from '../shared/model/contact';
import { Location } from '@angular/common';


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
  avatar: string;

  constructor(private route: ActivatedRoute,
              private location: Location,
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
      this.inscriptionUrl = this.route.params.subscribe(
        (params: any) => {
            const id = 'id';
            this.idContact = params[id];
            const c$ =  this.connection.getContactById(params[id]);
            c$.subscribe(contactById => {
              this.fillForm(contactById);
              this.avatar = contactById.info.avatar;
            });
        }
      );
    }
    this.formulario = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [Validators.required, Validators.minLength(3)]],
      avatar: [null],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.minLength(3)]],
      address: [null, [Validators.required, Validators.minLength(3)]],
      gender: ['f', Validators.required],
      company: [null, [Validators.required, Validators.minLength(3)]],
      comments: [null],
      isFavorite: ['false', Validators.required],
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      let valueSubmit = Object.assign({}, this.formulario.value);
      valueSubmit = Object.assign(valueSubmit, {
        isFavorite: valueSubmit.isFavorite === 'true' ? true : false,
        avatar: this.avatar == null ? 'null' : this.avatar
      });
      this.connection.createContact(valueSubmit).subscribe(
        success => {
          alert('Cadastrado com sucesso!');
          this.resetForm();
          this.location.back();
        },
        error => alert('Error ao inserir contato')
      );

    } else {
      console.log('formulário invalido');
    }
   }

  resetForm() {
    this.formulario.reset();
  }

  fillForm(dados: Contact) {
    this.formulario.patchValue({
      firstName: dados.firstName,
      lastName: dados.lastName,
      avatar: null,
      email: dados.email,
      phone: dados.info.phone,
      address: dados.info.address,
      gender: dados.gender,
      company: dados.info.company ,
      comments: dados.info.comments,
      isFavorite: String(dados.isFavorite)
    });
  }

}
