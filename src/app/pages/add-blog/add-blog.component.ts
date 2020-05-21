import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from "@angular/forms";
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IBlog } from 'src/app/interface/iBlog';
import { DatePipe } from '@angular/common';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  uploadBlogForm: FormGroup;
  uploadPercent: Observable<number>;
  downloadUrl: Observable<string>;
  blog: IBlog;
  
  constructor(private fb: FormBuilder, 
    private afStorage: AngularFireStorage, 
    private adminService: AdminService) { 
    this.uploadBlogForm = this.fb.group({
      title: ['', Validators.required],
      file: ['', Validators.required],
      imageUrl: ['', Validators.required],
      body: ['', Validators.required],
      createdAt: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  fileUpload(event) {
    const randomId = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = `blogImages/${randomId}`;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);
    
    this.uploadPercent = task.percentageChanges();
    
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadUrl = fileRef.getDownloadURL()
        this.downloadUrl.subscribe(url => {
          console.log(url);
          this.uploadBlogForm.controls.imageUrl.patchValue(url);
          this.uploadBlogForm.get('createdAt').patchValue(new Date().getTime());
        })
      })
    ).subscribe();


  }

  getErrorMessage(formControlName) {
    if (this.uploadBlogForm.get(formControlName).hasError('required')) {
      return 'This Field Is Required'
    }
  }

  submitForm() {
    const formData = this.uploadBlogForm.value;
    const actualUpload = {
      title: formData.title,
      body: formData.body,
      imageUrl: formData.imageUrl,
      file: formData.file,
      createdAt: formData.createdAt,
      comments: [{authorName: '',
        authorImageUrl: '',
        timeStamp: '',
        message: ''}]
    }
    if (this.uploadBlogForm.valid) {
      this.adminService.addBlog(this.uploadBlogForm.value).then(() => {
        this.uploadBlogForm.reset({
          title: '',
          body: '',
          imageUrl: '',
          file: '',
          createdAt: ''
        })
      }).catch((err) => {
        console.log(err)
      })
    } else {
      console.log('Form Not Valid')
    }
    
  }


}
