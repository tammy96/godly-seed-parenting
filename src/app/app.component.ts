import { Component } from '@angular/core';
import { AngularFireFunctions } from "@angular/fire/functions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'godly-seed-parenting';

  constructor(private fns: AngularFireFunctions) {
    // const addAdminUser = fns.httpsCallable('addAdminUser');
    // addAdminUser({email: 'admin@admin.com'}).subscribe(val => {
    //   console.log(val)
    // });
  }
}
