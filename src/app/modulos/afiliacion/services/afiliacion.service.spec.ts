import { TestBed } from '@angular/core/testing';

import { AfiliacionService } from './afiliacion.service';

describe('AfiliacionService', () => {
  let service: AfiliacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfiliacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
