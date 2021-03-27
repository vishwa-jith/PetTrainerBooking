import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TrainersService } from '../services/trainers/trainers.service';
import { AddAppointmentService } from '../services/addAppointment/add-appointment.service';

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
    private addAppointmentService: AddAppointmentService
  ) {
    this.trainers = trainerService.getTrainers();
  }

  addAppointmentForm = this.fb.group({ date: [''], time: [''] });

  onSubmit() {
    this.addAppointmentService.addAppointment({
      id: this.trainerId,
      ...this.addAppointmentForm.value,
    });
  }
  handleTrainerId(id: number) {
    this.trainerId = id;
  }

  ngOnInit(): void {}
}
