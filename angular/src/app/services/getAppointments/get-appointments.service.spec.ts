import { TestBed } from '@angular/core/testing';

import { GetAppointmentsService } from './get-appointments.service';

describe('GetAppointmentsService', () => {
  let service: GetAppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
