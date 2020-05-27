import { Component, OnInit, AfterViewInit } from '@angular/core';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from 'src/app/services/admin.service';
import { IBlog } from 'src/app/interface/iBlog';
import { IUser } from 'src/app/interface/iUser';
import { AngularFireAuth } from '@angular/fire/auth';
import { UsersService } from 'src/app/services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IComment } from 'src/app/interface/iComment';
import { firestore } from 'firebase/app';
import { first, skip, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit, AfterViewInit {

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
  likesArray: string[];

  blogPost: IBlog;
  currentUser: IUser;
  comments: Observable<IComment[]>
  defaultImage = 'https://image.flaticon.com/icons/svg/21/21104.svg';
  commentForm: FormGroup;
  replyForm: FormGroup;
  currentUserId: string;
  liked:boolean = false;


  id: string;
  displayLength: number;
  firstComment: IComment[];
  allComments: boolean = false;
  hideMe:any = {};

  constructor(private route: ActivatedRoute, private router: Router, 
    private adminService: AdminService, private afAuth: AngularFireAuth,
    private userService: UsersService, private fb: FormBuilder, 
    private commentService: CommentService, private afs: AngularFirestore,
    private matSnackbar: MatSnackBar) { 
    this.id = this.route.snapshot.paramMap.get('id');

    this.commentForm = this.fb.group({
      authorName: ['', Validators.required],
      authorImageUrl: ['', Validators.required],
      message: ['', Validators.required],
      timeStamp: ['', Validators.required]
    });

    this.replyForm = this.fb.group({
      authorName: ['', Validators.required],
      authorImageUrl: ['', Validators.required],
      message: ['', Validators.required],
      timeStamp: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.adminService.getBlog(this.id).subscribe(value => {
      this.blogPost = value;
      console.log(this.blogPost);
      console.log(this.blogPost.likes)
      this.likesArray = value.likes;

    });
    this.comments = this.afs.collection('blog').doc(this.id).collection<IComment>('comments').valueChanges({idField: 'id'});
    this.comments.subscribe(value => {
      console.log(value)
      this.displayLength = value.length;
      this.firstComment = value
    })
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUserId  = user.uid;
        this.userService.getUser(user.uid).subscribe(val => {
          this.currentUser = val;
          if (!this.currentUser.photoURL) {
            this.currentUser.photoURL = this.defaultImage;
            console.log(this.currentUser.photoURL)
          }
        })
      }
    })
  }
  ngAfterViewInit() {
    console.log(this.currentUserId);
    console.log(this.likesArray)
    if (this.likesArray) {
      if (this.likesArray.includes(this.currentUserId)) {
        this.liked = true;
      }
    }
  }

  submitComment() {
    this.commentForm.get('authorName').patchValue(this.currentUser.name);
    this.commentForm.get('authorImageUrl').patchValue(this.currentUser.photoURL);
    this.commentForm.get('timeStamp').patchValue(new Date().getTime())
    console.log(this.commentForm.value)
    if (this.commentForm.valid) {
      this.commentService.addComment(this.id, this.commentForm.value).then(() => {
        console.log('Comment Added');
        this.commentForm.reset({
          authorName: '',
          authorImageUrl: '',
          timeStamp: '',
          message: ''
        })
      }).catch((err) => {
        console.log(err)
      })
    } else {
      console.log('Form Not Valid')
    }
    
  }

  replyComment(commentID) {
    this.replyForm.get('authorName').patchValue(this.currentUser.name);
    this.replyForm.get('authorImageUrl').patchValue(this.currentUser.photoURL);
    this.replyForm.get('timeStamp').patchValue(new Date().getTime());
    console.log(this.replyForm.value);
    if (this.replyForm.valid) {      
      this.afs.collection('blog').doc(this.id).collection('comments').doc(commentID).update({
        replies: firestore.FieldValue.arrayUnion(this.replyForm.value)
      }).then(() => {
        this.matSnackbar.open('Replied!!', 'Close', {
          duration: 2000
        })
        this.replyForm.reset({
          authorName: '',
          authorImageUrl: '',
          message: '',
          timeStamp: ''
        })
      }).catch((err)=> {
        this.matSnackbar.open(err.message, 'Close', {
          duration: 3000
        })
      })
    }
  }
  loadComments() {
    this.allComments = !this.allComments;
    console.log('Loading all comments')
  }
  like() {
    console.log(this.likesArray)
    console.log(this.currentUserId)
    // console.log(this.likesArray.includes(this.currentUserId))
    if (this.likesArray.length > 0) {
      if (this.likesArray.includes(this.currentUserId)) {
        this.afs.collection('blog').doc(this.id).update({
          likes: firestore.FieldValue.arrayRemove(this.currentUserId)
        }).then(() => {
          this.liked = false;
          this.matSnackbar.open('😞:(', null, {
            duration: 1000
          })
        }).catch(err => {
          this.matSnackbar.open(err.message, 'Close', {
            duration: 2000
          })
        })
      }
    } else {
      this.afs.collection('blog').doc(this.id).update({
        likes: firestore.FieldValue.arrayUnion(this.currentUserId)
      }).then(() => {
        this.liked = true;
        this.matSnackbar.open('😊 ^^', null, {
          duration: 1000
        })
      }).catch(err => {
        this.matSnackbar.open(err.message, 'Close', {
          duration: 2000
        })
      })
    }
  }

}
