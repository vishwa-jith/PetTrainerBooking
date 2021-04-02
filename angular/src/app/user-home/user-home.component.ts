import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TrainersService } from '../services/trainers/trainers.service';
import { AddBookingService } from '../services/addBooking/add-booking.service';
import { Trainer } from '../services/trainers/trainers.service.model';
import { BookingsService } from '../services/bookings/bookings.service';
import { Booking } from '../services/bookings/booking.service.model';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  trainers;
  selectedTrainer: any;
  isBookinUpdate: boolean = false;
  initialFormDate = this.fb.group({ date: [''], time: [''] });
  constructor(
    private trainerService: TrainersService,
    private fb: FormBuilder,
    private addBookingService: AddBookingService,
    private bookingsService: BookingsService
  ) {
    this.trainers = this.trainerService
      .getTrainers()
      .subscribe((train: Trainer[]) => {
        this.trainers = train;
      });
  }

  addBookingForm = this.initialFormDate;

  onSubmit(): void {
    if (this.isBookinUpdate) {
      console.log('Under Contruction');
    } else {
      this.addBookingService
        .addBookings({
          trainerId: this.selectedTrainer.id,
          lawFirmName: this.selectedTrainer.shopName,
          date: `${this.addBookingForm.value.date} ${this.addBookingForm.value.time}`,
          bookingStatus: 'waiting',
        })
        .subscribe((data: any) => {
          console.log(data);
          this.handleTrainer(this.selectedTrainer);
        });
    }
    this.addBookingForm = this.initialFormDate;
    this.isBookinUpdate = false;
  }
  handleTrainer(trainer: Trainer): void {
    this.selectedTrainer = trainer;
    this.bookingsService
      .getBooking(this.selectedTrainer.id)
      .subscribe((booking: any) => {
        if (booking.trainerId === this.selectedTrainer.id) {
          this.addBookingForm = this.fb.group({
            date: [new Date(booking.date).toISOString().substr(0, 10)],
            time: [new Date(booking.date).toTimeString().substr(0, 8)],
          });
          this.isBookinUpdate = true;
        } else {
          this.addBookingForm = this.initialFormDate;
        }
      });
  }

  ngOnInit(): void {}
}
