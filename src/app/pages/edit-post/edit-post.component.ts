import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { IBlog } from 'src/app/interface/iBlog';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  updateBlogForm: FormGroup;

  constructor(private adminService: AdminService, 
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBlog) {
    this.id = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.adminService.getBlog(this.id).subscribe(value => {
      this.post = value;
    })
  }

  update() {
    this.post.createdAt = new Date().getTime();
    this.adminService.updateBlog(this.id, this.post)
  }


}
