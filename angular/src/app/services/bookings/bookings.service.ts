import { Injectable } from '@angular/core';
import { Booking } from './booking.service.model';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  bookings: Booking[] = [
    {
      id: 1,
      user_name: 'ABC',
      date: '12/03/2021',
      time: '07:38 PM',
      is_accepted: true,
      is_rejected: false,
    },
    {
      id: 2,
      user_name: 'ABC',
      date: '12/03/2021',
      time: '07:38 PM',
      is_accepted: false,
      is_rejected: false,
    },
    {
      id: 3,
      user_name: 'ABC',
      date: '12/03/2021',
      time: '07:38 PM',
      is_accepted: true,
      is_rejected: false,
    },
    {
      id: 4,
      user_name: 'ABC',
      date: '12/03/2021',
      time: '07:38 PM',
      is_accepted: true,
      is_rejected: false,
    },
    {
      id: 5,
      user_name: 'ABC',
      date: '12/03/2021',
      time: '07:38 PM',
      is_accepted: false,
      is_rejected: false,
    },
    {
      id: 6,
      user_name: 'ABC',
      date: '12/03/2021',
      time: '07:38 PM',
      is_accepted: true,
      is_rejected: false,
    },
    {
      id: 7,
      user_name: 'ABC',
      date: '12/03/2021',
      time: '07:38 PM',
      is_accepted: true,
      is_rejected: false,
    },
    {
      id: 8,
      user_name: 'ABC',
      date: '12/03/2021',
      time: '07:38 PM',
      is_accepted: true,
      is_rejected: false,
    },
  ];
  getBookings = () => {
    return this.bookings;
  };
  constructor() {}
}
