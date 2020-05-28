import { Component, OnInit } from '@angular/core';
import { FormBuilder,  Validators, FormGroup } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  submitAttempt: boolean = false;
  userValue: any;
  hide = true;
  hide2 = true;

  constructor(private fb: FormBuilder, private authService: AuthService, 
    private router: Router, private afAuth: AngularFireAuth, private matSnackbar: MatSnackBar) { 
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

      this.userValue = {
        name: this.signUpForm.get('name').value,
        gender: this.signUpForm.get('gender').value,
        email: this.signUpForm.get('email').value
      }

      const email = this.signUpForm.controls.email.value;
      const password = this.signUpForm.controls.password.value;
      let actionCodeSettings = {
        // Change URL to domain that will be bought later,

        url: 'https://godly-seed-parenting-bf240.firebaseapp.com'
      }
      this.authService.createUserWithEmailPassword(email, password).then((res) => {
        this.authService.addUserToDatabaseFromEmailLogin(res, this.userValue)

        res.user.sendEmailVerification(actionCodeSettings).then(() => {
          this.router.navigate(['verify'])
        }).catch((err) => {
          this.matSnackbar.open(err.message, 'Close', {
            duration: 6000
          })
        })
        console.log('User Registered and Added To Collection Successfully')
      })
    } else {
      console.log('Form Not Valid')
    }
  }


}
