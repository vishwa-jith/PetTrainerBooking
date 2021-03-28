import { Injectable } from '@angular/core';
import { Appointment } from './get-appointments.services.model';

@Injectable({
  providedIn: 'root',
})
export class GetAppointmentsService {
  appointments: Appointment[] = [
    { id: 1, booking_id: 1, trainer_name: 'sample', date: '12/03/2021' },
    { id: 2, booking_id: 2, trainer_name: 'sample', date: '12/03/2021' },
    { id: 3, booking_id: 3, trainer_name: 'sample', date: '12/03/2021' },
    { id: 4, booking_id: 4, trainer_name: 'sample', date: '12/03/2021' },
  ];
  getAppointments = () => {
    return this.appointments;
  };
  constructor() {}
}
