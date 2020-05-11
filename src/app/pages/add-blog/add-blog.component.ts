import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  uploadBlogForm: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.uploadBlogForm = this.fb.group({
      title: ['', Validators.required],
      file: ['', Validators.required],
      imageUrl: ['', Validators.required],
      message: ['', Validators.required],
      createdAt: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

}
