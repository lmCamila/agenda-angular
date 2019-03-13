import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  currentPage: number;

  mudaValoresEvent = new EventEmitter<number>();

  constructor() { }

  setCurrentPage(page: number) {
    let inicio = 0;
    this.currentPage = page;
    page === 1 ? inicio = 0 : inicio = 15 * (page - 1);
    this.mudaValoresEvent.emit(inicio);
  }
  getCurrentPage() {
    return this.currentPage;
  }
}
