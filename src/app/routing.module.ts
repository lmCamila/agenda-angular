import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ContatoDetalhesComponent } from './contato-detalhes/contato-detalhes.component';
import { NovoEditarComponent } from './novo-editar/novo-editar.component';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';

const appRoutes: Routes = [
{ path: '' , component: ListaContatosComponent, children: [
    { path: 'new' , component: NovoEditarComponent},
    { path: 'id' , component: ContatoDetalhesComponent},
    { path: 'id/edit' , component: NovoEditarComponent}
]}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
