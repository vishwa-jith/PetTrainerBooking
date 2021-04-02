import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pet-trainer';
  constructor(private router: Router, private authService: AuthService) {}

  userDetails = JSON.parse(this.authService.getuserDetails());

  redirect(path: string): void {
    if (path === 'home') {
      if (this.userDetails.role === 'owner') {
        path = '/home';
      } else if (this.userDetails.role === 'trainer') {
        path = '/home/trainer';
      } else {
        path = '/home/admin';
      }
    } else if (path === 'report') {
      if (this.userDetails.role === 'owner') {
        path = '/report';
      } else if (this.userDetails.role === 'trainer') {
        path = '/report/trainer';
      }
    } else {
      localStorage.clear();
      path = '/login';
    }
    console.log(path);
    this.router.navigate([path]);
  }
}
