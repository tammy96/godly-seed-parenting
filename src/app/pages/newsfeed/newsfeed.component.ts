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
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  search: FormGroup;
  comment: FormGroup;
  blogs: IBlog[];
  logoutButton:boolean = false;
  defaultImage = 'https://image.flaticon.com/icons/svg/21/21104.svg'
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
    private auth: AngularFireAuth, private userService: UsersService) { 
    this.search = this.fb.group({
      searchInput: ['']
    });

    this.comment = this.fb.group({
      authorName: ['', Validators.required],
      authorImageUrl: ['', Validators.required],
      message: ['', Validators.required],
      timeStamp: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    this.adminService.getBlogs().subscribe(value => {
      this.blogs = value;

      this.auth.onAuthStateChanged((user) => {
        if (user) {
          console.log(user)
          this.userService.getUser(user.uid).subscribe(value => {
            this.currentUser = value;
            this.logoutButton = true;
          })
        } else {
          console.log('No Logged in User')
        }
      })
    })
  }
  logout() {
    this.auth.signOut();
    console.log('User Logged Out')
    this.logoutButton = false;
  }

  commentFunction(id) {
    this.comment.controls.authorName.patchValue(this.currentUser.name);
    if(this.currentUser.photoURL) {
      this.comment.controls.authorImageUrl.patchValue(this.currentUser.photoURL);
    } else {
      this.comment.controls.authorImageUrl.patchValue(this.defaultImage)
    }

    this.comment.controls.timeStamp.patchValue(new Date().getTime());
    console.log(this.comment.value)

    if (this.comment.valid) {
      this.adminService.addComment(id, this.comment.value).then(() => {
        console.log('Comment Added')
        this.comment.reset({
          authorName: '',
          authorImageUrl: '',
          timeStamp: '',
          message: ''
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }

}
