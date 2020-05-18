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

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

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

  blogPost: IBlog;
  currentUser: IUser;
  comments: Observable<IComment[]>
  defaultImage = 'https://image.flaticon.com/icons/svg/21/21104.svg';
  commentForm: FormGroup;
  replyForm: FormGroup;

  id: string;
  displayLength: number;

  constructor(private route: ActivatedRoute, private router: Router, 
    private adminService: AdminService, private afAuth: AngularFireAuth,
    private userService: UsersService, private fb: FormBuilder, 
    private commentService: CommentService, private afs: AngularFirestore) { 
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

    });
    this.comments = this.afs.collection('blog').doc(this.id).collection<IComment>('comments').valueChanges({idField: 'id'});
    this.comments.subscribe(value => {
      this.displayLength = value.length
    })
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userService.getUser(user.uid).subscribe(val => {
          this.currentUser = val;
          if (!this.currentUser.photoURL) {
            this.currentUser.photoURL = this.defaultImage;
          }
        })
      }
    })
  }

  submitComment() {
    this.commentForm.get('authorName').patchValue(this.currentUser.name);
    this.commentForm.get('authorImageUrl').patchValue(this.currentUser.photoURL);
    this.commentForm.get('timeStamp').patchValue(new Date().getTime())
    console.log(this.commentForm.value)
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
  }

}
