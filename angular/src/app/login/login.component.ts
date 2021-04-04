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
      if (data.jwt) {
        this.snackBar.open('Login Successful', 'close', {
          duration: 2000,
        });
        location.reload();
        this.authService.setUserDetails(data);
      } else {
        this.snackBar.open(data.message, 'close', {
          duration: 2000,
        });
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
