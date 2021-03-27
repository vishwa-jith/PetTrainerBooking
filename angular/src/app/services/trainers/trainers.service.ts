import { Injectable } from '@angular/core';
import { Trainer } from './trainers.service.model';

@Injectable({
  providedIn: 'root',
})
export class TrainersService {
  trainer: Trainer[] = [
    { id: 1, trainer_name: 'ABC', years: 3, shop_name: 'sample' },
    { id: 2, trainer_name: 'ABC', years: 3, shop_name: 'sample' },
    { id: 3, trainer_name: 'ABC', years: 3, shop_name: 'sample' },
    { id: 4, trainer_name: 'ABC', years: 3, shop_name: 'sample' },
    { id: 5, trainer_name: 'ABC', years: 3, shop_name: 'sample' },
    { id: 6, trainer_name: 'ABC', years: 3, shop_name: 'sample' },
    { id: 7, trainer_name: 'ABC', years: 3, shop_name: 'sample' },
    { id: 8, trainer_name: 'ABC', years: 3, shop_name: 'sample' },
  ];
  getTrainers = () => {
    return this.trainer;
  };
  constructor() {}
}
