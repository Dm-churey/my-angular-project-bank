import { TestBed } from '@angular/core/testing';

import { RegistrationValidationService } from './registration-validation.service';

describe('RegistrationValidationService', () => {
  let service: RegistrationValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
