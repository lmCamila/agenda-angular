import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  panelOpenState = false;

  constructor(private router: Router) { }

  showDetails(){
    this.router.navigate(['/id']);
  }
  ngOnInit() {
  }

}
