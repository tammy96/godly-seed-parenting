import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUser } from 'src/app/interface/iUser';
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Font Awesome Icon Variables
  faGoogle = faGoogle;
  faFacebook = faFacebook;

  loginForm: FormGroup;
  submitAttempt: boolean = false;
  constructor(private authService: AuthService, 
    private fb: FormBuilder, public router: Router,
    private matSnackbar: MatSnackBar) { 
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  ngOnInit() {
    
  } 


  login() {
    this.submitAttempt = true;
    if (this.loginForm.valid) {
      const email = this.loginForm.controls.email.value;
      const password = this.loginForm.controls.password.value;
      this.authService.emailPasswordLogin(email, password).then((res) => {
        console.log('User Logged In');
        console.log(res);
        res.user.getIdTokenResult().then(idTokenResult => {
          if(idTokenResult.claims.admin) {
            this.router.navigateByUrl('/admin')
          }

          this.router.navigate(['newsfeed'])
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
    } else {
      console.log('Form Not Valid')
    }
  }

  loginWithFacebook(): void {
    this.authService.loginFacebook().then(() => {
      this.router.navigateByUrl('/newsfeed');
    }).catch((err) => {
      this.matSnackbar.open(err.message, 'Close', {
        duration: 4000
      })
    });
  }

  loginDialog() {
    if (this.loginForm.valid){
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;
      this.authService.emailPasswordLogin(email, password).then((res) => {
        this.matSnackbar.open('Login Success', null, {
          duration: 2500
        })
        console.log(res)
      }).catch((err) => {
        this.matSnackbar.open(err.message, 'Close', {
          duration: 3000
        })
      })
    }
  }

  loginWithGoogle(): void {
    this.authService.loginGoogle().then(() => {
      this.router.navigateByUrl('/newsfeed');
    }).catch((err) => {
      this.matSnackbar.open(err.message, 'Close', {
        duration: 4000
      })
    });
  }
  loginWithFacebookDialog() {
    this.authService.loginFacebook().then(() => {
      this.matSnackbar.open('Login Success', null, {
        duration: 2000
      })
    }).catch(err => {
      this.matSnackbar.open(err.message, 'Close')
    })
  }
  loginWithGoogleDialog() {
    this.authService.loginGoogle().then(() => {
      this.matSnackbar.open('Login Success', null, {
        duration: 2000
      })
    }).catch(err => {
      this.matSnackbar.open(err.message, 'Close')
    })
  }

}
