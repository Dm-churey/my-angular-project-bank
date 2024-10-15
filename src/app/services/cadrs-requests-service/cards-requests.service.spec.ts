import { TestBed } from '@angular/core/testing';

import { CardsRequestsService } from './cards-requests.service';

describe('CardsService', () => {
  let service: CardsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
