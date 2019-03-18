import { Injectable } from '@angular/core';
import { NovoEditarComponent } from '../novo-editar/novo-editar.component';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatoDeactivateGuard implements CanDeactivate < NovoEditarComponent > {
    canDeactivate(
        component: NovoEditarComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
            return confirm('Deseja realmente sair? Informações alteradas ou inseridas não serão salvas.');
        }
}


