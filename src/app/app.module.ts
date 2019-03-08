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
import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent,
    MenuComponent,
    NovoEditarComponent,
    ButtonNewComponent,
    ListaContatosComponent,
    ContatoDetalhesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    routing
  ],
  exports: [ ],
  entryComponents: [ContatoComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
