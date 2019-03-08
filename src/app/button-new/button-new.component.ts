import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-new',
  templateUrl: './button-new.component.html',
  styleUrls: ['./button-new.component.css']
})
export class ButtonNewComponent implements OnInit {
  constructor(private router: Router) { }

  newContact() {
    this.router.navigate(['/new']);
  }
  ngOnInit() {
  }
}


