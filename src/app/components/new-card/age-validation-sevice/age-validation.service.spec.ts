import { TestBed } from '@angular/core/testing';
import { AgeValidationService } from './age-validation.service';
import { ClientInterface } from 'src/app/models/client';
import { ClientRequestsService } from 'src/app/services/client-requests-service/client-requests.service';

describe('AgeValidationService', () => {
  let service: AgeValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AgeValidationService,
        {
          provide: ClientRequestsService,
          useValue: {
            client$: {
              subscribe: jasmine.createSpy()
            }
          }
        }
      ]
    });
    service = TestBed.inject(AgeValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true for male clients between 18 and 60 years old', () => {
    const mockClientData: ClientInterface = {
      login: 'ddddd',
      email: 'dddd',
      lastName: 'dddd',
      firstName: 'ddddd',
      middleName: 'dddd',
      sex: 'Male',
      birthdate: '2002-01-01',
      phoneNumber: '11111111111',
      address: 'dddddd',
      isMustChangePassword: false,
    };
    service.data = mockClientData;

    expect(service.validateAge()).toBe(true);
  });

  it('should return false for male clients outside the age range', () => {
    const mockClientData: ClientInterface = {
      login: 'ddddd',
      email: 'dddd',
      lastName: 'dddd',
      firstName: 'ddddd',
      middleName: 'dddd',
      sex: 'Male',
      birthdate: '1954-01-01',
      phoneNumber: '11111111111',
      address: 'dddddd',
      isMustChangePassword: false,
    };
    service.data = mockClientData;

    expect(service.validateAge()).toBe(false);
  });

  it('should return true for female clients between 30 and 50 years old', () => {
    const mockClientData: ClientInterface = {
      login: 'ddddd',
      email: 'dddd',
      lastName: 'dddd',
      firstName: 'ddddd',
      middleName: 'dddd',
      sex: 'Female',
      birthdate: '1990-01-01',
      phoneNumber: '11111111111',
      address: 'dddddd',
      isMustChangePassword: false,
    };
    service.data = mockClientData;

    expect(service.validateAge()).toBe(true);
  });

  it('should return false for female clients outside the age range', () => {
    const mockClientData: ClientInterface = {
      login: 'ddddd',
      email: 'dddd',
      lastName: 'dddd',
      firstName: 'ddddd',
      middleName: 'dddd',
      sex: 'Female',
      birthdate: '1970-01-01',
      phoneNumber: '11111111111',
      address: 'dddddd',
      isMustChangePassword: false,
    };
    service.data = mockClientData;

    expect(service.validateAge()).toBe(false);
  });

  it('should return false if birthdate is not provided', () => {
    const mockClientData: ClientInterface = {
      login: 'ddddd',
      email: 'dddd',
      lastName: 'dddd',
      firstName: 'ddddd',
      middleName: 'dddd',
      sex: 'Male',
      birthdate: '',
      phoneNumber: '11111111111',
      address: 'dddddd',
      isMustChangePassword: false,
    };
    service.data = mockClientData;

    expect(service.validateAge()).toBe(false);
  });
});