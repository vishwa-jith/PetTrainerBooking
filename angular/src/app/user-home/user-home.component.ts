import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TrainersService } from '../services/trainers/trainers.service';
import { AddBookingService } from '../services/addBooking/add-booking.service';
import { Trainer } from '../services/trainers/trainers.service.model';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  trainers;
  selectedTrainer: any;
  constructor(
    private trainerService: TrainersService,
    private fb: FormBuilder,
    private addBookingService: AddBookingService
  ) {
    this.trainers = this.trainerService
      .getTrainers()
      .subscribe((train: Trainer[]) => {
        this.trainers = train;
      });
  }

  addBookingForm = this.fb.group({ date: [''], time: [''] });

  onSubmit(): void {
    this.addBookingService
      .addBookings({
        trainerId: this.selectedTrainer.id,
        lawFirmName: this.selectedTrainer.shopName,
        date: `${this.addBookingForm.value.date} ${this.addBookingForm.value.time}`,
        bookingStatus: 'waiting',
      })
      .subscribe((data: any) => console.log(data));
  }
  handleTrainer(trainer: Trainer): void {
    this.selectedTrainer = trainer;
  }

  ngOnInit(): void {}
}
