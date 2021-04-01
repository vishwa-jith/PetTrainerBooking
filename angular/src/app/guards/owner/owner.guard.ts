import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OwnerGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(): boolean {
    const userDetails: any = this.authService.getuserDetails();
    if (
      !!this.authService.getuserDetails() &&
      JSON.parse(userDetails).role === 'owner'
    ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
