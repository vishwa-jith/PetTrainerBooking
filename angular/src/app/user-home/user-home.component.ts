import { Component, OnInit } from '@angular/core';
import { TrainersService } from '../services/trainers/trainers.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  trainers;
  constructor(trainerService: TrainersService) {
    this.trainers = trainerService.getTrainers();
  }

  ngOnInit(): void {}
}
