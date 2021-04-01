import { Injectable } from '@angular/core';
import { BookingStatus } from './booking-status.service.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class BookingStatusService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  baseUrl =
    'https://8080-bafeaefeddfbbbacedbefccaeeabbfbebdcacd.examlyiopb.examly.io';
  userDetails = JSON.parse(this.authService.getuserDetails());

  addBookingsStatus(bookingStatus: BookingStatus): any {
    return this.http.put<any>(
      this.baseUrl +
        `/Trainer/booking/${bookingStatus.id}/${this.userDetails.id}`,
      {
        bookingStatus: bookingStatus.bookingStatus,
      }
    );
  }
}
