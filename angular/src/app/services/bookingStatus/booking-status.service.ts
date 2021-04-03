import { Injectable } from '@angular/core';
import { BookingStatus } from './booking-status.service.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class BookingStatusService {
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

  addBookingsStatus(bookingStatus: BookingStatus): any {
    return this.http.put<any>(
      this.baseUrl + `/Trainer/booking/${bookingStatus.id}`,
      {
        bookingStatus: bookingStatus.bookingStatus,
      },
      this.httpOptions
    );
  }
}
