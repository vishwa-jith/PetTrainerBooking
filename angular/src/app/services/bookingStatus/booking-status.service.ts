import { Injectable } from '@angular/core';
import { BookingStatus } from './booking-status.service.model';

@Injectable({
  providedIn: 'root',
})
export class BookingStatusService {
  constructor() {}

  addBookingsStatus(bookingStatus: BookingStatus): void {
    console.log(bookingStatus);
  }
}
