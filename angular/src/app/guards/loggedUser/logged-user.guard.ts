import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(): boolean {
    const userDetails: any = this.authService.getuserDetails();
    if (!!this.authService.getuserDetails()) {
      if (JSON.parse(userDetails).role === 'owner') {
        this.router.navigate(['/home']);
      } else if (JSON.parse(userDetails).role === 'trainer') {
        this.router.navigate(['/home/trainer']);
      } else {
        this.router.navigate(['/home/admin']);
      }
      return false;
    } else {
      return true;
    }
  }
}
