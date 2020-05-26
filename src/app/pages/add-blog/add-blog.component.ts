import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from "@angular/forms";
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IBlog } from 'src/app/interface/iBlog';
import { DatePipe } from '@angular/common';
import { AdminService } from 'src/app/services/admin.service';
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    private adminService: AdminService,
    private matSnackbar: MatSnackBar) { 
    this.uploadBlogForm = this.fb.group({
      title: ['', Validators.required],
      file: ['', Validators.required],
      imageUrl: ['', Validators.required],
      metadata: ['', Validators.required],
      body: ['', Validators.required],
      createdAt: ['', Validators.required]
    })
  }
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngOnInit(): void {
  }
  fileUpload(event) {
    console.log(event)
    const fileName = this.uploadBlogForm.get('title').value;
    const file = event.target.files[0];
    const fileType: string  = event.target.files[0].type;
    this.uploadBlogForm.get('metadata').patchValue(fileType)
    const filePath = `blogImages/${fileName}`;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file, {
      contentType: fileType
    });
    
    this.uploadPercent = task.percentageChanges();
    
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadUrl = fileRef.getDownloadURL()
        fileRef.getMetadata().subscribe(value => {
          console.log(value)
        })
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
    if (this.uploadBlogForm.valid) {
      this.adminService.addBlog(this.uploadBlogForm.value).then(() => {
        this.matSnackbar.open('Post Uploaded', 'Close', {
          duration: 3000
        });
        this.uploadBlogForm.reset({
          title: '',
          body: '',
          imageUrl: '',
          file: '',
          createdAt: ''
        });
      }).catch((err) => {
        this.matSnackbar.open(err.message, 'Close', {
          duration: 3000
        })
      })
    } else {
      this.matSnackbar.open('Form Not Valid', 'Close', {
        duration: 3000
      })
    }
    
  }


}
