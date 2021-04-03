import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe((data: any) => {
      this.snackBar.open(data.message, 'close', {
        duration: 2000,
      });
      if (data.jwt) {
        this.authService.setUserDetails(data);
        location.reload();
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
