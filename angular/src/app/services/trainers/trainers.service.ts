import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trainer, TrainerForAdmin } from './trainers.service.model';

@Injectable({
  providedIn: 'root',
})
export class TrainersService {
  constructor(private http: HttpClient) {}

  baseUrl =
    'https://8080-bafeaefeddfbbbacedbefccaeeabbfbebdcacd.examlyiopb.examly.io';

  getTrainers(): any {
    return this.http.get<Trainer[]>(this.baseUrl + `/Trainer`);
  }
  getTrainersForAdmin(): any {
    return this.http.get<TrainerForAdmin[]>(this.baseUrl + `/Admin`);
  }
}
