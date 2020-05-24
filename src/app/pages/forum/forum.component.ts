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
  currentUser;
  
  constructor(private fb: FormBuilder,
     private forumService: ForumService,
     private afAuth: AngularFireAuth,
     private snackbar: MatSnackBar) {
    this.forumForm = this.fb.group({
      message: ['', Validators.required],
      timestamp: ['', Validators.required],
      authorName: ['', Validators.required],
      authorImageurl: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.currentUser = this.afAuth.currentUser;
  }
  ngAfterViewInit() {
    this.snackbar.open(`You're not logged in!`, 'Please Login', {
      duration: 2000
    })
  }

  addMessage() {
    if(this.forumForm.valid) {
      this.forumService.addMessage(this.forumForm.value).then(() => {
        console.log('Message Added')
      }).catch(err => {
        console.log(err)
      })
    } else {
      console.log('Form Not Valid')
    }
  }

}
