import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoEditarComponent } from './novo-editar.component';

describe('NovoEditarComponent', () => {
  let component: NovoEditarComponent;
  let fixture: ComponentFixture<NovoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
