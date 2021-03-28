import { Injectable } from '@angular/core';
import { AppointmentTrainer } from './appointment-trainer.service.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentTrainerService {
  constructor() {}
  addAppointmentTrainer(appointmentTrainer: AppointmentTrainer): void {
    console.log(appointmentTrainer);
  }
}
