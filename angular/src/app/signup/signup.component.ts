import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  signupForm = this.fb.group({
    email: [''],
    mobile_no: [''],
    username: [''],
    password: [''],
  });

  onSubmit(): void {
    this.authService.signup(this.signupForm.value);
  }

  ngOnInit(): void {}
}
