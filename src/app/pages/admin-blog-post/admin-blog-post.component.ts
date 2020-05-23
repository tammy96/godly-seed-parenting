import { Component, OnInit, } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IBlog } from 'src/app/interface/iBlog';
import {MatDialog} from '@angular/material/dialog';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-admin-blog-post',
  templateUrl: './admin-blog-post.component.html',
  styleUrls: ['./admin-blog-post.component.css']
})
export class AdminBlogPostComponent implements OnInit {

  blogs: IBlog[] = [];

  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.adminService.getBlogs().subscribe(value => {
      this.blogs = value;
    })
  }
  showDetails(id) {
    this.adminService.getBlog(id).subscribe(value => {
      console.log(value)
    })
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(EditPostComponent, {
      width: '350px',
      // height: ''
      data: {
        id: id
      }
    });
  }

  deletePost(id) {
    this.adminService.deleteBlog(id).then(() => {
      console.log('Post Deleted')
    }).catch((err) => {
      console.log(err)
    })
  }
}