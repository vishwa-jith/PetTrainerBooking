import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pet-trainer';
  constructor(private authService: AuthService) {}
  userDetails = JSON.parse(this.authService.getuserDetails());
  redirect(path: string): void {
    if (path === 'logout') {
      localStorage.clear();
      location.reload();
    } else {
      this.authService.redirect(path);
    }
  }
}
