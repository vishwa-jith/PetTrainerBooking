import { Component, OnInit } from '@angular/core';
import { BookingsService } from '../services/bookings/bookings.service';

@Component({
  selector: 'app-trainer-home',
  templateUrl: './trainer-home.component.html',
  styleUrls: ['./trainer-home.component.css'],
})
export class TrainerHomeComponent implements OnInit {
  bookings;
  constructor(private bookingService: BookingsService) {
    this.bookings = this.bookingService.getBookings();
  }

  ngOnInit(): void {}
}
