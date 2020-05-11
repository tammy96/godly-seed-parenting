import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersCollection: AngularFirestoreCollection

  constructor(private afs: AngularFirestore) {
// A reference to the blogs collection in the database
    // Returns all blogs in an array of objects without the document id
    // Returns an Observable that you'll need to subscribe to

    this.usersCollection = this.afs.collection('blog');

    // Another reference to the blogs collection in the database
    // Returns all blogs in an array of objects with the document is
  
  }
   

  

  
}
