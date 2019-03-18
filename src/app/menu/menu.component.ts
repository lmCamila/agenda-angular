import { Component, OnInit } from '@angular/core';

import { ListContactsService } from '../shared/list-contacts.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuSearch = false;
  selected = 'none';
  constructor(private listContactService: ListContactsService) { }

  modifyMenu() {
    this.menuSearch = !this.menuSearch;
  }

  search(event: KeyboardEvent) {
    console.log((event.target as HTMLInputElement).value);
    this.listContactService.searchContact((event.target as HTMLInputElement).value);
  }

  onClick() {
    this.listContactService.setListContactResponsive(false);
  }

  onChangeFav(event) {
    let isFav: boolean;
    event === 'true' ? isFav = true : isFav = false;
    this.listContactService.filter(isFav);
  }
  ngOnInit() {
  }

}
