import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuSearch = false;
  constructor() { }

  modifyMenu() {
    this.menuSearch = !this.menuSearch;
  }
  search(event: KeyboardEvent) {
    console.log((event.target as HTMLInputElement).value);
  }
  ngOnInit() {
  }

}
