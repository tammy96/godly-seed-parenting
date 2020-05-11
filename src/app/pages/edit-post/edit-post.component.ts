import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { IBlog } from 'src/app/interface/iBlog';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  uploadPercent: Observable<number>;
  downloadUrl: Observable<string>;
  id: string;
  post: IBlog;

  constructor(private adminService: AdminService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.adminService.getBlog(this.id).subscribe(value => {
      this.post = value;
    })
  }


}
