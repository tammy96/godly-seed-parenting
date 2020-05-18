import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IComment } from '../interface/iComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments: Observable<IComment[]>

  constructor(private afs: AngularFirestore) {

      // this.afs.collection('blog').doc(id).collection('comments').snapshotChanges().pipe(
      //   map(action => action.map(value => {
      //     const id = value.payload.doc.id;
      //     const data = value.payload.doc.data();
      //     return {id, ...data}
      //   }))
      // )
   }

  addComment(id, data) {
    return this.afs.collection('blog').doc(id).collection('comments').add(data);
  }
}
