import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { UsersService } from './services/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from './interface/iUser';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'godly-seed-parenting';
  user: IUser;
  faUser = faUser;
  public showSideMenu: boolean;
  public showFiller: boolean;
  loggedIn: boolean = false;
  isAdmin: boolean;
  constructor(
    public breakpointObserver: BreakpointObserver,
    private afAuth: AngularFireAuth,
    private fns: AngularFireFunctions,
    private matSnackbar: MatSnackBar
  ) {
    // const addAdminUser = this.fns.httpsCallable('addAdminUser');
    // addAdminUser({email: 'admin@admin.com'}).subscribe(val => {
    //   console.log(val)
    // });
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 520px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showSideMenu = true;
        } else {
          this.showSideMenu = false;
        }
      });
  }

  ngAfterViewInit() {
    this.afAuth.authState.subscribe((res) => {
      if (!res) {
        console.log('No Current User')
        this.loggedIn = false;
        this.isAdmin = false;
      }
      if (res) {
        console.log(res)
        this.loggedIn = true;
        res.getIdTokenResult().then((val) => {
          this.isAdmin = val.claims.admin;
        })
      }
    })
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.matSnackbar.open('Logout Successful', 'Close', {
        duration: 2000
      })
    }).catch((err) => {
      this.matSnackbar.open(err.message, 'Close', {
        duration: 4000
      })
    });
  }
}
