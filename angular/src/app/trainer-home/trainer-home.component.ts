import { Component, OnInit } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Booking } from '../services/bookings/booking.service.model';
import { BookingsService } from '../services/bookings/bookings.service';
import { BookingStatusService } from '../services/bookingStatus/booking-status.service';

@Component({
  selector: 'app-trainer-home',
  templateUrl: './trainer-home.component.html',
  styleUrls: ['./trainer-home.component.css'],
})
export class TrainerHomeComponent implements OnInit {
  bookings: Booking[] = [];
  acceptedBooking: Booking[] = [];
  nonAcceptedBooking: Booking[] = [];
  faCheck = faCheck;
  faTimes = faTimes;

  constructor(
    private bookingService: BookingsService,
    private bookingStatusService: BookingStatusService
  ) {
    this.getBookings();
  }
  getBookings() {
    this.bookingService.getBookings().subscribe((book: Booking[]) => {
      this.bookings = book;
      this.acceptedBooking = this.bookings.filter(
        ({ bookingStatus }) => bookingStatus === 'accepted'
      );
      this.nonAcceptedBooking = this.bookings.filter(
        ({ bookingStatus }) => bookingStatus === 'waiting'
      );
    });
  }
  handleBookingStatus(id: string, bookingStatus: string): void {
    this.bookingStatusService
      .addBookingsStatus({
        id,
        bookingStatus,
      })
      .subscribe((data: any) => {
        console.log(data);
        this.getBookings();
      });
  }

  ngOnInit(): void {}
}
