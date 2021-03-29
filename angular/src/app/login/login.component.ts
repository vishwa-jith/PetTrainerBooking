import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  loginForm = this.fb.group({ email: [''], password: [''] });

  onSubmit(): void {
    this.authService.login(this.loginForm.value);
  }

  ngOnInit(): void {}
}
