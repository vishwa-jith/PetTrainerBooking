import { Injectable } from '@angular/core';
import { Booking } from './booking.service.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  baseUrl =
    'https://8080-bafeaefeddfbbbacedbefccaeeabbfbebdcacd.examlyiopb.examly.io';

  userDetails = JSON.parse(this.authService.getuserDetails());

  getBookings(): any {
    return this.http.get<Booking[]>(
      this.baseUrl + `/Trainer/booking/${this.userDetails.id}`
    );
  }
  getBooking(id: string): any {
    return this.http.get<Booking>(
      this.baseUrl + `/booking/${this.userDetails.id}/${id}`
    );
  }
  updateBooking(date: string, id: string): any {
    return this.http.put<Booking>(
      this.baseUrl + `/booking/${this.userDetails.id}/${id}`,
      { date }
    );
  }
}
