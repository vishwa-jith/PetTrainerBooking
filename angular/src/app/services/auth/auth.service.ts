import { Injectable } from '@angular/core';
import { Login, Signup } from './auth.service.model';
import { UserDetails } from './auth.service.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getuserDetails(): any {
    return localStorage.getItem('userDetails');
  }

  setUserDetails = (userDetails: UserDetails) => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  };

  login(loginDetails: Login): void {
    console.log(loginDetails);
  }
  signup(signupDetails: Signup): void {
    console.log(signupDetails);
  }
}
