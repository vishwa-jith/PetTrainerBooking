import { Injectable } from '@angular/core';
import { Appointment } from './get-appointments.services.model';

@Injectable({
  providedIn: 'root',
})
export class GetAppointmentsService {
  appointments: Appointment[] = [
    { id: 1, booking_id: 1, trainer_name: 'Lokesh R', date: '22/03/2021' },
    { id: 2, booking_id: 2, trainer_name: 'Vishwajith V', date: '05/11/2021' },
    {
      id: 3,
      booking_id: 3,
      trainer_name: 'Suresh Anand K',
      date: '12/05/2021',
    },
    { id: 4, booking_id: 4, trainer_name: 'Sai Prasadth', date: '02/09/2021' },
  ];
  getAppointments = () => {
    return this.appointments;
  };
  constructor() {}
}
