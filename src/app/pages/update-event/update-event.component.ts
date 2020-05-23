import { Component, AfterViewInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IBlog } from 'src/app/interface/iBlog';
import { EventService } from 'src/app/services/event.service';
import { IEvent } from 'src/app/interface/iEvent';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements AfterViewInit {
  event: IEvent;
  uploadPercent: Observable<number>;
  downloadUrl: Observable<string>;

  constructor(
    public dialogRef: MatDialogRef<UpdateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBlog,
    private eventService: EventService,
    private afStr: AngularFireStorage,
  ) { }

  ngAfterViewInit(): void {
    this.eventService.getEvent(this.data.id).subscribe(value => {
      this.event = value;
    })
  }
  fileChange(event) {
    let id: string = this.event.name;
    const file = event.target.files[0];
    const filePath = `events/${id}`;
    const fileRef = this.afStr.ref(filePath);
    const task = this.afStr.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadUrl = fileRef.getDownloadURL();

        this.downloadUrl.subscribe(url => {
          this.event.imageUrl = url;
        })
      })
    ).subscribe();
  }

  update() {
    console.log(this.event.id)
    if(this.event) {
      this.eventService.updateEvent(this.data.id, this.event)
    } else {
      console.log('Something is wrong')
    }
  }

}
