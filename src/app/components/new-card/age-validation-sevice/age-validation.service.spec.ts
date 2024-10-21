import { TestBed } from '@angular/core/testing';

import { AgeValidationService } from './age-validation.service';

describe('AgeValidationService', () => {
  let service: AgeValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgeValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
