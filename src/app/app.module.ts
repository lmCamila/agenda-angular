import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ContatoComponent } from './contato/contato.component';
import { MenuComponent } from './menu/menu.component';
import { NovoEditarComponent } from './novo-editar/novo-editar.component';
import { ButtonNovoEditarComponent } from './button-new/button-novo-editar.component';

import { DemoMaterialModule } from 'src/material-module';
import { ButtonNewComponent } from './button-new/button-new.component';

@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent,
    MenuComponent,
    NovoEditarComponent,
    ButtonNewComponent,
    ButtonNovoEditarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule
  ],
  exports: [ ButtonNovoEditarComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
