import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe((data: any) => {
      this.authService.setUserDetails(data);
      this.authService.redirect('home');
      location.reload();
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
