import { Injectable } from '@angular/core';
import { AddBooking } from './add-booking.service.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AddBookingService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  baseUrl = this.authService.getBaseUrl();

  userDetails = JSON.parse(this.authService.getuserDetails());

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.userDetails.jwt}`,
    }),
  };

  addBookings(bookingDetails: AddBooking): any {
    return this.http.post<any>(
      this.baseUrl + `/booking`,
      bookingDetails,
      this.httpOptions
    );
  }
}
