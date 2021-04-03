import { Injectable } from '@angular/core';
import { AppointmentTrainer } from './appointment-trainer.service.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentTrainerService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  baseUrl =
    'https://8080-bafeaefeddfbbbacedbefccaeeabbfbebdcacd.examlyiopb.examly.io';
  userDetails = JSON.parse(this.authService.getuserDetails());

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.userDetails.jwt}`,
    }),
  };

  addAppointmentTrainer(appointmentTrainer: AppointmentTrainer): any {
    console.log(appointmentTrainer);
    return this.http.post<any>(
      this.baseUrl + `/Trainer/report`,
      appointmentTrainer,
      this.httpOptions
    );
  }

  updateReport(appointmentTrainer: AppointmentTrainer, userId: string): any {
    console.log(appointmentTrainer);
    return this.http.put<any>(
      this.baseUrl + `/Trainer/report/${userId}`,
      appointmentTrainer,
      this.httpOptions
    );
  }
}
