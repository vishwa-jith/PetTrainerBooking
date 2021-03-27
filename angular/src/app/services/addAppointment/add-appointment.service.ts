import { Injectable } from '@angular/core';
import { AddAppointment } from './addappointment.service.model';

@Injectable({
  providedIn: 'root',
})
export class AddAppointmentService {
  constructor() {}
  addAppointment(appointmentDetails: AddAppointment) {
    console.log(appointmentDetails);
  }
}
