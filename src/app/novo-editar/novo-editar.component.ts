import { ListContactsService } from '../shared/list-contacts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';


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

  constructor(private route: ActivatedRoute,
              private listContactService: ListContactsService,
              private formBuilder: FormBuilder) {

    this.listContactService.setListContactResponsive(true);

    if (this.route.snapshot.routeConfig.path === 'new') {
      this.title = 'Novo';
    } else {
      this.title = 'Editar';
    }

  }

  ngOnInit() {
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

}
