import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators, FormGroup } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  submitAttempt: boolean = false;
  hide = true;
  hide2 = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.signUpForm =  this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }
  
  getErrorMessage(formControlName) {
    if (this.signUpForm.get(formControlName).hasError('required')) {
      return 'You must enter a value';
    }
    if (this.signUpForm.get(formControlName).hasError('minlength')) {
      return 'Minimum Length is 6 Characters';
    }
    
    return this.signUpForm.get(formControlName).hasError('email') ? 'Not a valid email' : '';
  }

  passwordMatch() {
    if (this.signUpForm.get('password').value !== this.signUpForm.get('confirmPassword').value) {
      return 'Password and Confirm Password field don\'t match '
    }
  }

  ngOnInit(): void {
  }
  register() {
    this.submitAttempt = true;
    if(this.signUpForm.valid) {
      const email = this.signUpForm.controls.email.value;
      const password = this.signUpForm.controls.password.value;
      this.authService.createUserWithEmailPassword(email, password).then((res) => {
        this.authService.addUserToDatabaseFromEmailLogin(res, this.signUpForm.value)
        console.log('User Registered and Added To Collection Successfully')
        this.router.navigate(['newsfeed'])
      })
    } else {
      console.log('Form Not Valid')
    }
  }


}
