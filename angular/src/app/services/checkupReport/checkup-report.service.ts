import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckupReportService {
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

  checkupReportForOwner = (trainerId: string): any => {
    return this.http.get<any>(
      this.baseUrl + `/checkupReport/${trainerId}`,
      this.httpOptions
    );
  };

  checkupReportForTrainer = (userId: string) => {
    return this.http.get<any>(
      this.baseUrl + `/Trainer/checkupReport/${userId}`,
      this.httpOptions
    );
  };
}
