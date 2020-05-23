import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IEvent } from '../interface/iEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventsCollection: AngularFirestoreCollection<IEvent>;
  events: Observable<IEvent[]>;

  constructor(private afs: AngularFirestore) { 
    this.eventsCollection = this.afs.collection('events');


    this.events = this.eventsCollection.snapshotChanges().pipe(
      map(value => value.map(val => {
        const id = val.payload.doc.id;
        const data = val.payload.doc.data() as IEvent;
        return {id, ...data}
      }))
    )
  }

  getEvents() {
    return this.events;
  }

  addEvent(data) {
    return this.eventsCollection.add(data)
  }

  getEvent(id) {
    return this.eventsCollection.doc(id).valueChanges();
  }

  updateEvent(id, data) {
    return this.eventsCollection.doc(id).update(data);
  }

  deleteEvent(id) {
    return this.eventsCollection.doc(id).delete();
  }
}
