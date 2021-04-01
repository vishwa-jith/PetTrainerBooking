import { Injectable } from '@angular/core';
import { AppointmentTrainer } from './appointment-trainer.service.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentTrainerService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  baseUrl =
    'https://8080-bafeaefeddfbbbacedbefccaeeabbfbebdcacd.examlyiopb.examly.io';
  userDetails = JSON.parse(this.authService.getuserDetails());

  addAppointmentTrainer(appointmentTrainer: AppointmentTrainer): any {
    console.log(appointmentTrainer);
    return this.http.post<any>(this.baseUrl + `/Trainer/report`, {
      appointmentId: this.userDetails.id,
      ...appointmentTrainer,
    });
  }
}
