import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { IBlog } from 'src/app/interface/iBlog';

@Component({
  selector: 'app-view-posts',
  templateUrl: './view-posts.component.html',
  styleUrls: ['./view-posts.component.css']
})
export class ViewPostsComponent implements OnInit {

  blogs: IBlog[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.blogs.subscribe(value => {
      console.log(value)
      this.blogs = value;
    })
  }

}
