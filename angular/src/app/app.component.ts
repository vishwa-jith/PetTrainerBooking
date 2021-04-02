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
    this.authService.redirect(path);
  }
}
