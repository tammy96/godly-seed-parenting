import { Component, OnInit } from '@angular/core';
import { faBell,  faBars, faEnvelope, faComment, faNewspaper, faUsers } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // Font Awesome Icon Variables

  faBell = faBell;
  faEnvelope = faEnvelope;
  faBars = faBars;
  faComment = faComment;
  faNewspaper = faNewspaper;
  faUsers = faUsers;
  constructor() { }

  ngOnInit(): void {
  }

}
