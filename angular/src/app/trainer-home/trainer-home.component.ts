import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import { BookingsService } from '../services/bookings/bookings.service';
import { Booking } from '../services/bookings/booking.service.model';
import { BookingStatusService } from '../services/bookingStatus/booking-status.service';

@Component({
  selector: 'app-trainer-home',
  templateUrl: './trainer-home.component.html',
  styleUrls: ['./trainer-home.component.css'],
})
export class TrainerHomeComponent implements OnInit {
  bookings;
  acceptedBookings: Booking[];
  nonAcceptedBookings: Booking[];
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(
    private bookingService: BookingsService,
    private bookingStatusService: BookingStatusService
  ) {
    this.bookings = this.bookingService.getBookings();
    this.acceptedBookings = this.bookings.filter(
      ({ is_accepted }) => is_accepted
    );
    this.nonAcceptedBookings = this.bookings.filter(
      ({ is_accepted, is_rejected }) => !is_accepted && !is_rejected
    );
  }

  handleBookingStatus(id: number, accept_status: boolean) {
    this.bookingStatusService.addBookingsStatus({
      id,
      is_accepted: accept_status,
      is_rejected: !accept_status,
    });
  }

  ngOnInit(): void {}
}
