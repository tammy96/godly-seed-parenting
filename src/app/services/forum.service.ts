import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { IForum } from '../interface/iForum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  forumCollection: AngularFirestoreCollection<IForum>;
  forumMessages: Observable<IForum[]>;



  constructor(private afs: AngularFirestore) {
    this.forumCollection = afs.collection('forum');

    this.forumMessages = this.forumCollection.valueChanges({idField: 'id'});
   }

   getMessages(): Observable<IForum[]> {
     return this.forumMessages;
   }

   getMessage(id: string) {
     return this.forumCollection.doc(id).valueChanges();
   }

   addMessage(data: IForum): Promise<DocumentReference> {
     return this.forumCollection.add(data);
   }

   deleteMessage(id: string): Promise<void> {
     return this.forumCollection.doc(id).delete();
   }
}
