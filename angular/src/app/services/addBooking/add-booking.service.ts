import { Injectable } from '@angular/core';
import { AddBooking } from './add-booking.service.models';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AddBookingService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  baseUrl =
    'https://8080-bafeaefeddfbbbacedbefccaeeabbfbebdcacd.examlyiopb.examly.io';
  userDetails = JSON.parse(this.authService.getuserDetails());

  addBookings(bookingDetails: AddBooking): any {
    return this.http.post<any>(this.baseUrl + `/booking`, {
      id: this.userDetails.id,
      ...bookingDetails,
    });
  }
}
