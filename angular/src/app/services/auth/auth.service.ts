import { Injectable } from '@angular/core';
import { Login, Signup } from './auth.service.model';
import { UserDetails } from './auth.service.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  baseUrl =
    'https://8080-bafeaefeddfbbbacedbefccaeeabbfbebdcacd.examlyiopb.examly.io';

  getuserDetails(): any {
    return localStorage.getItem('userDetails');
  }

  setUserDetails = (userDetails: any) => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  };
  getBaseUrl = () => {
    return this.baseUrl;
  };
  redirect(path: string): void {
    const userDetails = JSON.parse(this.getuserDetails());
    if (userDetails) {
      if (path === 'home') {
        if (userDetails.role === 'owner') {
          path = '/home';
        } else if (userDetails.role === 'trainer') {
          path = '/home/trainer';
        } else {
          path = '/home/admin';
        }
      } else if (path === 'report') {
        if (userDetails.role === 'owner') {
          path = '/report';
        } else if (userDetails.role === 'trainer') {
          path = '/report/trainer';
        }
      } else {
        localStorage.clear();
        path = '/login';
      }
    } else {
      localStorage.clear();
      path = '/login';
    }
    this.router.navigate([path]);
  }

  sendOtp(email: string): any {
    return this.http.post<any>(this.baseUrl + `/otp`, { email });
  }

  login(loginDetails: Login): any {
    return this.http.post<any>(this.baseUrl + `/login`, loginDetails);
  }

  signup(signupDetails: Signup): any {
    return this.http.post<any>(this.baseUrl + `/signup`, signupDetails);
  }
}
