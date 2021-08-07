import { TestBed } from '@angular/core/testing';

import { CasedetailsService } from './casedetails.service';

describe('CasedetailsService', () => {
  let service: CasedetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasedetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
