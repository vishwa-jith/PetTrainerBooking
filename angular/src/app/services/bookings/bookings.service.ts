import { Injectable } from '@angular/core';
import { Booking } from './booking.service.model';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  bookings: Booking[] = [
    { id: 1, user_name: 'ABC', date: '12/03/2021', time: '07:38 PM' },
    { id: 2, user_name: 'ABC', date: '12/03/2021', time: '07:38 PM' },
    { id: 3, user_name: 'ABC', date: '12/03/2021', time: '07:38 PM' },
    { id: 4, user_name: 'ABC', date: '12/03/2021', time: '07:38 PM' },
    { id: 5, user_name: 'ABC', date: '12/03/2021', time: '07:38 PM' },
    { id: 6, user_name: 'ABC', date: '12/03/2021', time: '07:38 PM' },
    { id: 7, user_name: 'ABC', date: '12/03/2021', time: '07:38 PM' },
    { id: 8, user_name: 'ABC', date: '12/03/2021', time: '07:38 PM' },
  ];
  getBookings = () => {
    return this.bookings;
  };
  constructor() {}
}
