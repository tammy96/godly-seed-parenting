import { Component, OnInit, AfterViewInit } from '@angular/core';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ForumService } from 'src/app/services/forum.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from "@angular/material/dialog";
import { LoginComponent } from '../login/login.component';
import { IUser } from 'src/app/interface/iUser';
import { UsersService } from 'src/app/services/users.service';
import { IForum } from 'src/app/interface/iForum';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit, AfterViewInit {

  // FONT AWESOME ICON VARIABLES
  faBars = faBars;
  faSearch = faSearch;
  faPlus = faPlus;
  faHome = faHome;
  faNewspaper = faNewspaper;
  faComment = faComment;
  faCalendar = faCalendar;
  faThumbsUp = faThumbsUp;

  forumForm: FormGroup;
  forumMessages: IForum[];
  currentUser;
  userValue: IUser;
  defaultImage = 'https://image.flaticon.com/icons/svg/21/21104.svg';
  
  constructor(private fb: FormBuilder,
     private forumService: ForumService,
     private afAuth: AngularFireAuth,
     private snackbar: MatSnackBar,
     private matDialog: MatDialog,
     private userService: UsersService) {
    this.forumForm = this.fb.group({
      message: ['', Validators.required],
      timestamp: ['', Validators.required],
      authorName: ['', Validators.required],
      authorUID: ['', Validators.required],
      authorImageUrl: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.forumService.getMessages().subscribe(value => {
      this.forumMessages = value;
      console.log(this.forumMessages)
      this.forumMessages.sort((a, b) => {
        return a.timestamp - b.timestamp
      })
    })

  }
  ngAfterViewInit() {
    this.afAuth.authState.subscribe((user) => {
      console.log(user)
      if (!user) {
        this.matDialog.open(LoginComponent)
      }
      if (user) {
        console.log(user.uid)
        this.currentUser = user;
        
        this.userService.getUser(user.uid).subscribe(value => {
          this.userValue = value;
          if (!this.userValue.photoURL) {
            this.userValue.photoURL = this.defaultImage
          }
        })
      }
      
    })
    console.log(this.currentUser);
    this.snackbar.open(`You're not logged in!`, 'Please Login', {
      duration: 2000
    })
  }

  addMessage() {
    this.forumForm.get('authorImageUrl').patchValue(this.userValue.photoURL);
    this.forumForm.get('authorName').patchValue(this.userValue.name);
    this.forumForm.get('authorUID').patchValue(this.currentUser.uid);
    this.forumForm.get('timestamp').patchValue(new Date().getTime());
    console.log(this.forumForm.value)

    if(this.forumForm.valid) {
      this.forumService.addMessage(this.forumForm.value).then(() => {

        this.forumForm.reset({
          message: '',
          timestamp: '',
          authorName: '',
          authorImageUrl: ''
        })
        console.log('Message Added')
        this.snackbar.open('Message Added', null, {
          duration: 1000
        })
      }).catch(err => {
        console.log(err)
        this.snackbar.open(err.message, 'Close')
      })
    } else {
      console.log('Form Not Valid')
    }
  }

  login() {
    this.matDialog.open(LoginComponent)
  }

}
