import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AddEventComponent } from '../add-event/add-event.component';
import { UpdateEventComponent } from '../update-event/update-event.component';
import { EventService } from 'src/app/services/event.service';
import { IEvent } from 'src/app/interface/iEvent';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  eventsArray: IEvent[];

  constructor(public router: Router, public dialog: MatDialog,
    private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(value => {
      this.eventsArray = value;
    })
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddEventComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editDialog(id) {
    const editDialogRef = this.dialog.open(UpdateEventComponent, {
      data: {id: id}
    });
    editDialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }

  deleteEvent(id) {
    this.eventService.deleteEvent(id);
  }

}
