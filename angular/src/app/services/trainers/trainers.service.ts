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

  addNewTrainer(trainer: TrainerForAdmin): any {
    return this.http.post<any>(this.baseUrl + `/Admin/add`, {
      role: 'trainer',
      ...trainer,
    });
  }

  updateTrainer(trainer: TrainerForAdmin, id: string): any {
    return this.http.put<any>(this.baseUrl + `/Admin/update/${id}`, trainer);
  }

  deleteTrainer(id: string): any {
    return this.http.delete<any>(this.baseUrl + `/Admin/remove/${id}`);
  }
}
