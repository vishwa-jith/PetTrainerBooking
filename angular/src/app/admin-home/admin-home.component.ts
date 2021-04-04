import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TrainersService } from '../services/trainers/trainers.service';
import { TrainerForAdmin } from '../services/trainers/trainers.service.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  trainers: TrainerForAdmin[] = [];
  selectedTrainer: any;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  initialForm = this.fb.group({
    username: [''],
    email: [''],
    experience: [''],
    shopName: [''],
    password: [''],
    profileUrl: [''],
  });

  constructor(
    private trainerService: TrainersService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.getTrainers();
  }
  newTrainerForm = this.initialForm;

  getTrainers(): void {
    this.trainers = this.trainerService
      .getTrainersForAdmin()
      .subscribe((train: TrainerForAdmin[]) => {
        this.trainers = train;
      });
  }

  onSubmit(): void {
    if (this.selectedTrainer) {
      this.trainerService
        .updateTrainer(
          { ...this.selectedTrainer, ...this.newTrainerForm.value },
          this.selectedTrainer.id
        )
        .subscribe((data: any) => {
          this.selectedTrainer = null;
          this.newTrainerForm = this.initialForm;
          this.getTrainers();
          this.snackBar.open(data.message, 'close', {
            duration: 2000,
          });
          console.log(data);
        });
    } else {
      this.trainerService
        .addNewTrainer(this.newTrainerForm.value)
        .subscribe((data: any) => {
          console.log(data);
          this.newTrainerForm = this.initialForm;
          this.snackBar.open(data.message, 'close', {
            duration: 2000,
          });
          this.getTrainers();
        });
    }
  }

  handleSelectedTrainer(trainer: TrainerForAdmin): void {
    this.selectedTrainer = trainer;
    this.newTrainerForm = this.fb.group({
      username: [trainer.username],
      email: [trainer.email],
      experience: [trainer.experience],
      shopName: [trainer.shopName],
      password: [trainer.password],
      profileUrl: [trainer.profileUrl],
    });
  }

  deleteTrainer(id: string): void {
    this.trainerService.deleteTrainer(id).subscribe((data: any) => {
      console.log(data);
      this.selectedTrainer = null;
      this.newTrainerForm = this.initialForm;
      this.getTrainers();
      this.snackBar.open(data.message, 'close', {
        duration: 2000,
      });
    });
  }

  cancelUpdate(): void {
    this.selectedTrainer = null;
    this.newTrainerForm = this.initialForm;
  }

  ngOnInit(): void {}
}
