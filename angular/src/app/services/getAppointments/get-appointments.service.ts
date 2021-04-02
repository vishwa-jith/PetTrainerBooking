import { Injectable } from '@angular/core';
import { Appointment } from './get-appointments.services.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GetAppointmentsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  baseUrl =
    'https://8080-bafeaefeddfbbbacedbefccaeeabbfbebdcacd.examlyiopb.examly.io';

  userDetails = JSON.parse(this.authService.getuserDetails());

  getAppointments = () => {
    return this.http.get<Appointment[]>(
      this.baseUrl + `/Appointment/${this.userDetails.id}`
    );
  };
}
