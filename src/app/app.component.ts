import { Component } from '@angular/core';
import { AngularFireFunctions } from "@angular/fire/functions";
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { UsersService } from './services/users.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from './interface/iUser';
import { faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'godly-seed-parenting';
  user: IUser;
  faUser = faUser;
  public showSideMenu: boolean;
  public showFiller: boolean;
  constructor(public breakpointObserver: BreakpointObserver,
     private userService: UsersService, private afAuth: AngularFireAuth) {}

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
      this.afAuth.authState.subscribe(value => {
        if (value.uid) {
          this.userService.getUser(value.uid).subscribe(userValue => {
            this.user = userValue;
          })
        }
      })
  };

  logout() {
    this.afAuth.signOut();
  }

}
