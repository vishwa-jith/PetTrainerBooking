import { Injectable } from '@angular/core';
import { TableTrainer, Trainer } from './admin.service.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  tableTrainers: TableTrainer[] = [
    { id: 1, username: 'xyz', email: 'xyz@gmail.com' },
    { id: 2, username: 'efg', email: 'efg@gmail.com' },
    { id: 2, username: 'efg', email: 'efg@gmail.com' },
    { id: 2, username: 'efg', email: 'efg@gmail.com' },
  ];
  trainers: Trainer[] = [
    {
      id: 1,
      username: 'xyz',
      email: 'xyz@gmail.com',
      experience: 8,
      shop_name: 'xyz shop',
      password: 'xyz@123',
    },
    {
      id: 2,
      username: 'efg',
      email: 'efg@gmail.com',
      experience: 8,
      shop_name: 'efg shop',
      password: 'efg@123',
    },
    {
      id: 3,
      username: 'abc',
      email: 'abc@gmail.com',
      experience: 8,
      shop_name: 'abc shop',
      password: 'abc@123',
    },
    {
      id: 4,
      username: 'lme',
      email: 'lme@gmail.com',
      experience: 8,
      shop_name: 'lme shop',
      password: 'lme@123',
    },
  ];
  getTableTrainer(): TableTrainer[] {
    return this.tableTrainers;
  }
  getTrainer(trainerId: number): Trainer {
    return this.trainers.filter(({ id }) => id === trainerId)[0];
  }
  addTrainer(trainerDetails: Trainer): void {
    console.log(trainerDetails);
  }
  deleteTrainer(id: number): void {
    console.log(id);
  }

  constructor() {}
}
