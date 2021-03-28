import { TestBed } from '@angular/core/testing';

import { AppointmentTrainerService } from './appointment-trainer.service';

describe('AppointmentTrainerService', () => {
  let service: AppointmentTrainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentTrainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
