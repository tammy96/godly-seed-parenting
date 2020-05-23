import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Router } from '@angular/router';


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
    private fb: FormBuilder, private router: Router) { 
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
    this.authService.loginFacebook();
    this.router.navigateByUrl('/newsfeed');
  }

  loginWithGoogle(): void {
    this.authService.loginGoogle();
    this.router.navigateByUrl('/newsfeed');
  }

}
