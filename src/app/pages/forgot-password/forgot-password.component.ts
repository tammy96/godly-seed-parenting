import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from "@angular/material/dialog";
import { ResetSuccessComponent } from '../reset-success/reset-success.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  value: string = '';
  constructor(private afAuth: AngularFireAuth, 
    private matDialog: MatDialog, private matSnackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  sendPasswordReset() {
    let actionCodeSettings = {
      // Change URL to domain that will be bought later,

      url: 'https://godly-seed-parenting-bf240.firebaseapp.com'
    }

    this.afAuth.sendPasswordResetEmail(this.value, actionCodeSettings).then(() => {
      this.matDialog.open(ResetSuccessComponent);
    }).catch((err) => {
      this.matSnackbar.open(err.message, 'Close', {
        duration: 5000
      })
    })
  }

}
