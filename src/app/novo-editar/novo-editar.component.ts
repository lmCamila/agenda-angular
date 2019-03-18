
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher, MatDialogRef, MatDialog } from '@angular/material';
import { Contact } from '../shared/model/contact';

import { UpdateService } from './../shared/update.service';
import { ListContactsService } from '../shared/list-contacts.service';
import { ConnectionApiService } from './../shared/connection-api.service';
import { DialogModalComponent } from '../shared/dialog-modal/dialog-modal.component';
import { NovoEditarService } from './novo-editar.service';

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
export class NovoEditarComponent implements OnInit, OnDestroy {
  title = 'Novo';
  matcher = new MyErrorStateMatcher();
  formulario: FormGroup;
  inscription: Subscription;
  inscriptionUrl: Subscription;
  inscriptionEdit: Subscription;
  inscriptionUpload: Subscription;
  avatarEvent: Subscription;
  idContact: number;
  avatar: string;
  dialogModal: MatDialogRef<DialogModalComponent>;
  progress: number = 0;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private listContactService: ListContactsService,
              private updateService: UpdateService,
              private novoEditarService: NovoEditarService,
              private connection: ConnectionApiService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) {
    this.listContactService.setListContactResponsive(true);
  }

  ngOnInit() {
    //inscrição no evento de eviar arquivo
    this.inscriptionUpload = this.novoEditarService.issueEventupload.subscribe(
      p => this.progress = p
    )
    // verifica rota e carrega se necessário contato
    if (this.route.snapshot.routeConfig.path === 'new') {
      this.title = 'Novo';
    } else {
      this.title = 'Editar';
      this.inscriptionUrl = this.route.params.subscribe(
        (params: any) => {
            const id = 'id';
            this.idContact = params[id];
            const c =  this.connection.getContactById(params[id]);
            c.subscribe(contactById => {
              this.fillForm(contactById);
              this.avatar = contactById.info.avatar;
              this.idContact = contactById.id;
            });
        }
      );
    }
    // define o formulário
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
      if(this.title === 'Novo'){
        this.connection.createContact(valueSubmit).subscribe(
          success => {
            this.dialogModal = this.dialog.open(DialogModalComponent, {
              data: {
                message: 'Contato inserido com sucesso!',
                cancelar: false
              }
            });
            this.resetForm();
            this.connection.list().subscribe(dados => {
              this.listContactService.setContacts(dados);
            });
          },
          error => this.dialogModal = this.dialog.open(DialogModalComponent, {
            data: {
              message: 'Erro, contato não pode ser inserido!',
              cancelar: false
            }
          })
        );
      }else if(this.title === 'Editar'){
        this.updateService.update(this.idContact,valueSubmit);
      }

    } else {
      this.dialogModal = this.dialog.open(DialogModalComponent, {
        data: {
          message: 'Erro, formulário inválido!',
          cancelar: false
        }
      })
    }
   }
// reseta o formulário
  resetForm() {
    this.formulario.reset();
  }


  //preenche o form
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

  onChangeAvatar(event){
    this.novoEditarService.upload(event.path[0].files[0]);
    this.avatarEvent = this.novoEditarService.issueUrlResponse.subscribe(url => {
      this.avatar = url;
    });
  }

  ngOnDestroy(){
    if(this.inscriptionEdit){
      this.inscriptionEdit.unsubscribe();
    }
    if(this.inscriptionUpload){
      this.inscriptionUpload.unsubscribe();
    }
    if(this.inscriptionUrl){
      this.inscriptionUrl.unsubscribe();
    }
    if(this.avatarEvent){
      this.avatarEvent.unsubscribe();
    }
    
  }
}
