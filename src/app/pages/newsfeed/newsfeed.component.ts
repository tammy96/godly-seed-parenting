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
import { CommentService } from 'src/app/services/comment.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IComment } from 'src/app/interface/iComment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  search: FormGroup;
  comment: FormGroup;
  reply: FormGroup;
  blogs: IBlog[];
  comments: Observable<IComment[]>
  logoutButton:boolean = false;
  defaultImage = 'https://image.flaticon.com/icons/svg/21/21104.svg';
  currentUser;
  replyDisplay: boolean = false;

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
    private auth: AngularFireAuth, private userService: UsersService,
    private commentService: CommentService, private afs: AngularFirestore) { 
    this.search = this.fb.group({
      searchInput: ['']
    });

    this.comment = this.fb.group({
      authorName: ['', Validators.required],
      authorImageUrl: ['', Validators.required],
      message: ['', Validators.required],
      timeStamp: ['', Validators.required]
    });

    this.reply = this.fb.group({
      authorName: ['', Validators.required],
      authorImageUrl: ['', Validators.required],
      message: ['', Validators.required],
      timeStamp: ['', Validators.required]
    })

  }

  ngOnInit(): void {
    this.adminService.getBlogs().subscribe(value => {
      this.blogs = value;
      // this.blogs.forEach(item => {
      //   this.getComments(item.id).subscribe(value => console.log(value))
      // })
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
      this.commentService.addComment(id, this.comment.value).then(() => {
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

  replyComment(blogID, commentID) {
    this.reply.controls.authorName.patchValue(this.currentUser.name);
    if(this.currentUser.photoURL) {
      this.reply.controls.authorImageUrl.patchValue(this.currentUser.photoURL);
    } else {
      this.reply.controls.authorImageUrl.patchValue(this.defaultImage)
    }
    this.reply.controls.timeStamp.patchValue(new Date().getTime());
    console.log(this.reply.value, commentID)
    this.afs.collection('blog').doc(blogID).collection('comments').doc(commentID).update({
      replies: firestore.FieldValue.arrayUnion(this.reply.value)
    })

  }

  displayReply() {
    this.replyDisplay = !this.replyDisplay;
  }

  getComments(id) {
    // return this.comments =  this.afs.collection('blog').doc(id).collection<IComment>('comments').snapshotChanges().pipe(
    //   map(action =>  {
    //     return action.map(value => {
    //     const docId = value.payload.doc.id;
    //     const data = value.payload.doc.data() as IComment;

    //     return {docId, ...data}
    //   })
    // })
    // );
    this.comments = this.afs.collection('blog').doc(id).collection<IComment>('comments').valueChanges({idField: 'id'});
    return this.comments;
 }

 searchInput(event) {
    console.log(event)
    let input: string  = event.srcElement.value;
    console.log(input)
    if(!input) {
      return;
    }

    this.blogs = this.blogs.filter((val) => {

      if (input === '') {
        return
      }

      if (input && val.title) {
        return (val.title.toLowerCase().indexOf(input.toLowerCase()) > -1 || val.body.toLowerCase().indexOf(input.toLowerCase()) > -1);
      }
    })
 }



}
