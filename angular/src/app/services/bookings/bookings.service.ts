import { Injectable } from '@angular/core';
import { Booking } from './booking.service.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  baseUrl =
    'https://8080-bafeaefeddfbbbacedbefccaeeabbfbebdcacd.examlyiopb.examly.io';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getBookings(): any {
    return this.http.get<Booking[]>(
      this.baseUrl + '/Trainer/booking/1252874c-b1b6-4748-9cc8-8f192720c3c9'
    );
  }
}
