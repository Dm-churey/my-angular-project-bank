import { TestBed } from '@angular/core/testing';

import { AccountsRequestsService } from './accounts-requests.service';

describe('AccountsService', () => {
  let service: AccountsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
