import { Injectable } from '@angular/core';
import { Login, Signup } from './auth.service.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(loginDetails: Login): void {
    console.log(loginDetails);
  }
  signup(signupDetails: Signup): void {
    console.log(signupDetails);
  }
}
