import { ListContactsService } from '../shared/list-contacts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuSearch = false;
  constructor(private listContactService: ListContactsService) { }

  modifyMenu() {
    this.menuSearch = !this.menuSearch;
  }

  search(event: KeyboardEvent) {
    console.log((event.target as HTMLInputElement).value);
  }

  onClick() {
    this.listContactService.setListContactResponsive(false);
  }
  ngOnInit() {
  }

}
