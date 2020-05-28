import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  value: string = '';
  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  sendPasswordReset() {
    let actionCodeSettings = {
      // Change URL to domain that will be bought later,

      url: 'https://godly-seed-parenting-bf240.firebaseapp.com'
    }

    this.afAuth.sendPasswordResetEmail(this.value, actionCodeSettings)
  }

}
