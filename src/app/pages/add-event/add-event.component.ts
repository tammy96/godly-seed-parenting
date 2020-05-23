import { Component, OnInit, Inject } from '@angular/core';
import { IEvent } from 'src/app/interface/iEvent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  EventForm: FormGroup;
  uploadPercent: Observable<number>;
  downloadUrl: Observable<string>;
  closeDialog: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddEventComponent>,
    private eventService: EventService,
    private fb: FormBuilder,
    private afStr: AngularFireStorage,
    @Inject(MAT_DIALOG_DATA) public data: IEvent) {
      this.EventForm = this.fb.group({
        name: ['', Validators.required],
        date: ['', Validators.required],
        details: ['', Validators.required],
        file: ['', Validators.required],
        imageUrl: ['', Validators.required]
      })
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  fileUpload(event) {
    let id: string = this.EventForm.get('name').value;
    const file = event.target.files[0];
    const filePath = `events/${id}`;
    const fileRef = this.afStr.ref(filePath);
    const task = this.afStr.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadUrl = fileRef.getDownloadURL();

        this.downloadUrl.subscribe(url => {
          this.EventForm.controls.imageUrl.patchValue(url);
        })
      })
    ).subscribe();
  }

  addEvent() {
    console.log(this.EventForm.value)
    if (this.EventForm.valid){
      this.eventService.addEvent(this.EventForm.value).then(() => {
        this.EventForm.reset({
          name: '',
          date: '',
          details: '',
          file: '',
        })
        this.closeDialog = false;
      })
    } else {
      console.log('Form Not Valid')
    }
    
  }

}
