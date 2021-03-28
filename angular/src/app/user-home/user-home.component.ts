import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TrainersService } from '../services/trainers/trainers.service';
import { AddBookingService } from '../services/addBooking/add-booking.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  trainers;
  trainerId: number | undefined;
  constructor(
    trainerService: TrainersService,
    private fb: FormBuilder,
    private addBookingService: AddBookingService
  ) {
    this.trainers = trainerService.getTrainers();
  }

  addBookingForm = this.fb.group({ date: [''], time: [''] });

  onSubmit(): void {
    this.addBookingService.addBookings({
      id: this.trainerId,
      ...this.addBookingForm.value,
    });
  }
  handleTrainerId(id: number): void {
    this.trainerId = id;
  }

  ngOnInit(): void {}
}
