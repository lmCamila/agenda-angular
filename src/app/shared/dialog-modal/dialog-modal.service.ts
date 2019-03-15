import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DialogModalService {

  eventMessageDialog = new EventEmitter< boolean >();
  confirmAction: boolean;

  constructor() { }

  setConfirmAction(confirm: boolean) {
    this.confirmAction = confirm;
    this.eventMessageDialog.emit(confirm);
  }
}
