import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators, FormGroup } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  submitAttempt: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) { 
    this.signUpForm =  this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
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
        console.log('User Regisetered and Added To Collection Successfully')
      })
    } else {
      console.log('Form Not Valid')
    }
  }

}
