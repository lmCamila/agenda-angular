import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ContatoComponent } from './contato/contato.component';
import { MenuComponent } from './menu/menu.component';
import { NovoEditarComponent } from './novo-editar/novo-editar.component';
import { DemoMaterialModule } from 'src/material-module';
import { ButtonNewComponent } from './button-new/button-new.component';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';
import { ContatoDetalhesComponent } from './contato-detalhes/contato-detalhes.component';

import { PaginationComponent } from './pagination/pagination.component';
import { RoutingModule } from './routing.module';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent,
    MenuComponent,
    NovoEditarComponent,
    ButtonNewComponent,
    ListaContatosComponent,
    ContatoDetalhesComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    RoutingModule
  ],
  exports: [ ],
  entryComponents: [ContatoComponent, NovoEditarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
