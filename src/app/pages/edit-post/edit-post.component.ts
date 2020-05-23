import { Component, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { IBlog } from 'src/app/interface/iBlog';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements AfterViewInit {

  uploadPercent: Observable<number>;
  downloadUrl: Observable<string>;
  id: string;
  post: IBlog;
  updateBlogForm: FormGroup;
  closeDialog: boolean = false;

  constructor(private adminService: AdminService, 
    public dialogRef: MatDialogRef<EditPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBlog) {}
    @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngAfterViewInit(): void {
    this.adminService.getBlog(this.data.id).subscribe(value => {
      this.post = value;
      console.log(this.post);
      // this.autosize.resizeToFitContent(true);
    })
  }

  update() {
    this.post.createdAt = new Date().getTime();
    this.adminService.updateBlog(this.data.id, this.post).then(() => {
      console.log('Post Updated');
      this.closeDialog = false;
    }).catch((err) => {
      console.log(err)
    })
  }


}
