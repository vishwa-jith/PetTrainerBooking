import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings/bookings.service';
import { Booking } from '../services/bookings/booking.service.model';

@Component({
  selector: 'app-trainer-home',
  templateUrl: './trainer-home.component.html',
  styleUrls: ['./trainer-home.component.css'],
})
export class TrainerHomeComponent implements OnInit {
  bookings;
  acceptedBookings: Booking[];
  nonAcceptedBookings: Booking[];
  constructor(private bookingService: BookingsService) {
    this.bookings = this.bookingService.getBookings();
    this.acceptedBookings = this.bookings.filter(
      ({ is_accepted }) => is_accepted
    );
    console.log(this.acceptedBookings);
    this.nonAcceptedBookings = this.bookings.filter(
      ({ is_accepted }) => !is_accepted
    );
  }

  ngOnInit(): void {}
}
