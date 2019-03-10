import { ContatoDetalhesComponent } from './contato-detalhes/contato-detalhes.component';
import { ButtonNewComponent } from './button-new/button-new.component';
import { Routes, RouterModule } from '@angular/router';

import { NovoEditarComponent } from './novo-editar/novo-editar.component';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
const APP_ROUTES: Routes = [
{ path: '' , component: ListaContatosComponent,children: [
    { path: 'new' , component: NovoEditarComponent},
    { path: 'id' , component: ContatoDetalhesComponent},
    { path: 'id/editar' , component: NovoEditarComponent}
]},
{ path: 'new' , component: NovoEditarComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
