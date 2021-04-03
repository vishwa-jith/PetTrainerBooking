import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BookingsService } from '../services/bookings/bookings.service';
import { Booking } from '../services/bookings/booking.service.model';
import { faCalendarWeek, faClock } from '@fortawesome/free-solid-svg-icons';
import { AppointmentTrainerService } from '../services/appointmentTrainer/appointment-trainer.service';
import { CheckupReportService } from '../services/checkupReport/checkup-report.service';
import { Report } from '../services/checkupReport/checkup-report.service.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trainer-report',
  templateUrl: './trainer-report.component.html',
  styleUrls: ['./trainer-report.component.css'],
})
export class TrainerReportComponent implements OnInit {
  bookings: Booking[] = [];
  selectedBooking: any;
  isReportUpdate: boolean = false;
  initialFormData = this.fb.group({ amount: [''], days: [''], report: [''] });
  faCalendarWeek = faCalendarWeek;
  faClock = faClock;
  constructor(
    private bookingsService: BookingsService,
    private fb: FormBuilder,
    private appointmentTrainerService: AppointmentTrainerService,
    private checkupReportService: CheckupReportService,
    private snackBar: MatSnackBar
  ) {
    this.bookingsService
      .getBookings()
      .subscribe(
        (book: Booking[]) =>
          (this.bookings = book.filter(
            ({ bookingStatus }) => bookingStatus === 'accepted'
          ))
      );
  }

  trainerReportForm = this.initialFormData;

  handleSelectedBooking(selectedId: string): void {
    this.selectedBooking = this.bookings.filter(
      ({ id }) => id === selectedId
    )[0];
    this.checkupReportService
      .checkupReportForTrainer(selectedId)
      .subscribe((report: Report) => {
        if (report.id === selectedId) {
          this.trainerReportForm = this.fb.group({
            amount: [report.amount],
            days: [report.days],
            report: [report.report],
          });
          this.isReportUpdate = true;
        } else {
          this.trainerReportForm = this.initialFormData;
        }
      });
  }

  onSubmit(): void {
    if (this.isReportUpdate) {
      console.log('Under Contruction...');
    } else {
      this.appointmentTrainerService
        .addAppointmentTrainer({
          id: this.selectedBooking?.id,
          ...this.trainerReportForm.value,
        })
        .subscribe((data: any) => {
          console.log(data);
          this.snackBar.open(data.message, 'close', {
            duration: 2000,
          });
          this.handleSelectedBooking(this.selectedBooking.id);
        });
    }
    this.trainerReportForm = this.initialFormData;
    this.isReportUpdate = false;
  }
  ngOnInit(): void {}
}
