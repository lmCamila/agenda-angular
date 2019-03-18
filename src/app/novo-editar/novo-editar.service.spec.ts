import { TestBed } from '@angular/core/testing';

import { NovoEditarService } from './novo-editar.service';

describe('NovoEditarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NovoEditarService = TestBed.get(NovoEditarService);
    expect(service).toBeTruthy();
  });
});
