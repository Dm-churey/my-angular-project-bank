import { TestBed } from '@angular/core/testing';

import { OperationsRequestsService } from './operations-requests.service';

describe('OperationsRequestsService', () => {
  let service: OperationsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
