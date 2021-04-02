import { Component, OnInit } from '@angular/core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TrainersService } from '../services/trainers/trainers.service';
import { TrainerForAdmin } from '../services/trainers/trainers.service.model';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  trainers: TrainerForAdmin[] = [];
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  constructor(private trainerService: TrainersService) {
    this.trainers = this.trainerService
      .getTrainersForAdmin()
      .subscribe((train: TrainerForAdmin[]) => {
        this.trainers = train;
      });
  }

  ngOnInit(): void {}
}
