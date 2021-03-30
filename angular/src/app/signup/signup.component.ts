import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm:any;
  submitted=false;
  
  constructor(private fb: FormBuilder, private authService: AuthService) {}
    
  onSubmit(): void {
    this.submitted=true;
    this.authService.signup(this.signupForm.value);
  }
  
  get f() { return this.signupForm.controls; }
  ngOnInit() {
    this.signupForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        mobile_no:['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        username: ['',[Validators.required,Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      }, {
        validator: this.MustMatch('password', 'confirmPassword')
    });
}
MustMatch(password: string, confirmPassword: string) {
  return (signupForm: FormGroup) => {
      const control = signupForm.controls[password];
      const matchingControl = signupForm.controls[confirmPassword];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
   

}