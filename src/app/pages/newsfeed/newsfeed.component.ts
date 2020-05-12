import { Component, OnInit } from '@angular/core';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdminService } from 'src/app/services/admin.service';
import { IBlog } from 'src/app/interface/iBlog';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  search: FormGroup;
  blogs: IBlog[];
  logoutButton:boolean = false;
  currentUser;

  //FONT AWESOME ICON VARIABLES
  faBars = faBars;
  faSearch = faSearch;
  faPlus = faPlus;
  faHome = faHome;
  faComment = faComment;
  faCalendar = faCalendar;
  faThumbsUp = faThumbsUp;
  faPlay = faPlay;
  faNewspaper = faNewspaper;

  constructor(private fb: FormBuilder, private adminService: AdminService,
    private auth: AngularFireAuth) { 
    this.search = this.fb.group({
      searchInput: ['']
    })
  }

  ngOnInit(): void {
    this.adminService.getBlogs().subscribe(value => {
      this.blogs = value;

      this.auth.onAuthStateChanged((user) => {
        if (user) {
          console.log(user)
          this.currentUser = this.currentUser;
          this.logoutButton = true;
        } else {
          console.log('No Logged in User')
        }
      })
    })
  }
  logout() {
    this.auth.signOut();
  }

}
