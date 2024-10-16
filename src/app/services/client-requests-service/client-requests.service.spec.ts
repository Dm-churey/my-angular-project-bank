import { TestBed } from '@angular/core/testing';

import { ClientRequestsService } from './client-requests.service';

describe('CientRequestsService', () => {
  let service: ClientRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
