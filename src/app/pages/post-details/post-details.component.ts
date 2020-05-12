import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AdminService } from 'src/app/services/admin.service';
import { IBlog } from 'src/app/interface/iBlog';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  blog: IBlog;
  id: string;
  
  constructor(private route: ActivatedRoute, 
    private adminService: AdminService,
    private router: Router) { 
      this.id = this.route.snapshot.paramMap.get('id');
    }

  ngOnInit(): void {
   
    this.adminService.getBlog(this.id).subscribe(value => {
      this.blog = value;
    })
  }
  editPost() {
    this.router.navigateByUrl(`/admin/posts/edit/${this.id}`)
  }

  deletePost() {
    this.adminService.deleteBlog(this.id).then(() => {
      alert('Post Deleted');
      this.router.navigateByUrl('/admin/upload')
    });
  }

}
