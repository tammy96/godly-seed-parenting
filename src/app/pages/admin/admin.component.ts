import { Component, OnInit } from '@angular/core';
import { faBell,  faBars, faEnvelope, faComment, faNewspaper, faUsers } from "@fortawesome/free-solid-svg-icons";
import { UsersService } from 'src/app/services/users.service';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  usersArray: any[];
  blogsArray: any[];
  // Font Awesome Icon Variables

  faBell = faBell;
  faEnvelope = faEnvelope;
  faBars = faBars;
  faComment = faComment;
  faNewspaper = faNewspaper;
  faUsers = faUsers;
  constructor(private usersService: UsersService, 
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(value => {
      this.usersArray = value;
    })
    this.adminService.getBlogs().subscribe(value => {
      this.blogsArray = value;
    })
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login')
  }

}
