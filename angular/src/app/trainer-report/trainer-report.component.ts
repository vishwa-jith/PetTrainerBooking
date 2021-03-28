import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BookingsService } from '../services/bookings/bookings.service';
import { Booking } from '../services/bookings/booking.service.model';
import { faCalendarWeek, faClock } from '@fortawesome/free-solid-svg-icons';
import { AppointmentTrainerService } from '../services/appointmentTrainer/appointment-trainer.service';

@Component({
  selector: 'app-trainer-report',
  templateUrl: './trainer-report.component.html',
  styleUrls: ['./trainer-report.component.css'],
})
export class TrainerReportComponent implements OnInit {
  bookings;
  selectedBooking: Booking | undefined;
  faCalendarWeek = faCalendarWeek;
  faClock = faClock;
  constructor(
    private bookingsService: BookingsService,
    private fb: FormBuilder,
    private appointmentTrainerService: AppointmentTrainerService
  ) {
    this.bookings = this.bookingsService.getBookings();
  }

  trainerReportForm = this.fb.group({ amount: [''], days: [''], report: [''] });

  handleSelectedBooking(selectedId: number): void {
    this.selectedBooking = this.bookings.filter(
      ({ id }) => id === selectedId
    )[0];
  }

  onSubmit(): void {
    this.appointmentTrainerService.addAppointmentTrainer({
      id: this.selectedBooking?.id,
      ...this.trainerReportForm.value,
    });
  }
  ngOnInit(): void {}
}
