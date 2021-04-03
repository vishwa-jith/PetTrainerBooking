import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Trainer, TrainerForAdmin } from './trainers.service.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TrainersService {
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

  getTrainers(): any {
    return this.http.get<Trainer[]>(
      this.baseUrl + `/Trainer`,
      this.httpOptions
    );
  }

  getTrainersForAdmin(): any {
    return this.http.get<TrainerForAdmin[]>(
      this.baseUrl + `/Admin`,
      this.httpOptions
    );
  }

  addNewTrainer(trainer: TrainerForAdmin): any {
    return this.http.post<any>(
      this.baseUrl + `/Admin/add`,
      {
        role: 'trainer',
        ...trainer,
      },
      this.httpOptions
    );
  }

  updateTrainer(trainer: TrainerForAdmin, id: string): any {
    return this.http.put<any>(
      this.baseUrl + `/Admin/update/${id}`,
      trainer,
      this.httpOptions
    );
  }

  deleteTrainer(id: string): any {
    return this.http.delete<any>(
      this.baseUrl + `/Admin/remove/${id}`,
      this.httpOptions
    );
  }
}
