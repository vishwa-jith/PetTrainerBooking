import { TestBed } from '@angular/core/testing';

import { AddBookingService } from './add-booking.service';

describe('AddBookingService', () => {
  let service: AddBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
