import { ButtonNewComponent } from './button-new/button-new.component';
import { Routes, RouterModule } from '@angular/router';

import { NovoEditarComponent } from './novo-editar/novo-editar.component';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
const APP_ROUTES: Routes = [
{ path: '' , component: ListaContatosComponent},
{ path: 'new' , component: NovoEditarComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
