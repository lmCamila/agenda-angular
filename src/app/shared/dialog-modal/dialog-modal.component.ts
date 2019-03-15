import { Router } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { DialogModalService } from './dialog-modal.service';
import { ListContactsService } from '../list-contacts.service';
@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html'
})
export class DialogModalComponent implements OnInit {

  constructor(private dialogService: DialogModalService,
              private router: Router,
              private listService: ListContactsService,
              public dialogRef: MatDialogRef<DialogModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onClickConfirm() {
    this.dialogService.setConfirmAction(true);
    this.dialogRef.close();
    this.router.navigate(['/']);
    this.listService.setListContactResponsive(false);
  }

  onClickCancel() {
    this.dialogService.setConfirmAction(false);
    this.dialogRef.close();
    this.router.navigate(['/']);
    this.listService.setListContactResponsive(false);
  }
}
