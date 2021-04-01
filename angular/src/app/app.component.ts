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
    if (this.userDetails.role === 'owner') {
      if (path === 'home') {
        path = '/home';
      } else if (path === 'report') {
        path = '/report';
      }
    } else if (this.userDetails.role === 'trainer') {
      if (path === 'home') {
        path = '/home/trainer';
      } else if (path === 'report') {
        path = '/report/trainer';
      }
    } else {
      path = '/home/admin';
    }
    this.router.navigate([path]);
  }
}
