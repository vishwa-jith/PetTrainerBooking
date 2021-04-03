import { Injectable } from '@angular/core';
import { Booking } from './booking.service.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  userDetails = JSON.parse(this.authService.getuserDetails());

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.userDetails.jwt}`,
    }),
  };

  baseUrl =
    'https://8080-bafeaefeddfbbbacedbefccaeeabbfbebdcacd.examlyiopb.examly.io';

  getBookings(): any {
    return this.http.get<Booking[]>(
      this.baseUrl + `/Trainer/booking`,
      this.httpOptions
    );
  }
  getBooking(id: string): any {
    return this.http.get<Booking>(
      this.baseUrl + `/booking/${id}`,
      this.httpOptions
    );
  }
  updateBooking(date: string, id: string): any {
    return this.http.put<Booking>(
      this.baseUrl + `/booking/${id}`,
      { date },
      this.httpOptions
    );
  }
}
