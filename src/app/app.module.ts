
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DemoMaterialModule } from 'src/material-module';
import { RoutingModule } from './routing/routing.module';
import { AppComponent } from './app.component';
import { ContatoComponent } from './contato/contato.component';
import { MenuComponent } from './menu/menu.component';
import { NovoEditarComponent } from './novo-editar/novo-editar.component';
import { ButtonComponent } from './button/button.component';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';
import { ContatoDetalhesComponent } from './contato-detalhes/contato-detalhes.component';
import { DialogModalComponent } from './shared/dialog-modal/dialog-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent,
    MenuComponent,
    NovoEditarComponent,
    ButtonComponent,
    ListaContatosComponent,
    ContatoDetalhesComponent,
    DialogModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutingModule
  ],
  exports: [ ],
  entryComponents: [ContatoComponent, NovoEditarComponent, DialogModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
