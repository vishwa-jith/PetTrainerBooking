import { TestBed } from '@angular/core/testing';

import { CheckupReportService } from './checkup-report.service';

describe('CheckupReportService', () => {
  let service: CheckupReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckupReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
