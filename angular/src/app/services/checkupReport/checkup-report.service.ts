import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CheckupReportService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  baseUrl =
    'https://8080-bafeaefeddfbbbacedbefccaeeabbfbebdcacd.examlyiopb.examly.io';

  userDetails = JSON.parse(this.authService.getuserDetails());

  checkupReportForOwner = (trainerId: string): any => {
    return this.http.get<any>(
      this.baseUrl + `/checkupReport/${this.userDetails.id}/${trainerId}`
    );
  };

  checkupReportForTrainer = (userId: string) => {
    return this.http.get<any>(
      this.baseUrl + `/checkupReport/${userId}/${this.userDetails.id}`
    );
  };
}
