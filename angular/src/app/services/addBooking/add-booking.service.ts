import { Injectable } from '@angular/core';
import { AddBooking } from './add-booking.service.models';

@Injectable({
  providedIn: 'root',
})
export class AddBookingService {
  constructor() {}
  addBookings(bookingDetails: AddBooking) {
    console.log(bookingDetails);
  }
}
