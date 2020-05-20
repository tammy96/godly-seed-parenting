import { Component } from '@angular/core';
import { AngularFireFunctions } from "@angular/fire/functions";
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'godly-seed-parenting';
  public showSideMenu: boolean;
  public showFiller: boolean;
  constructor(public breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 420px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.showSideMenu = true;
        } else {
          this.showSideMenu = false;
        }
      });
  }
}
