import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { IUser } from '../interface/iUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersCollection: AngularFirestoreCollection<IUser>
  users: Observable<IUser[]>

  constructor(private afs: AngularFirestore) {


    // A reference to the users collection in the database
    // Returns all users in an array of objects without the document id
    // Returns an Observable that you'll need to subscribe to
    this.usersCollection = this.afs.collection('users');


    // Returns the Users data with their Id for data manipulation
    this.users = this.usersCollection.snapshotChanges().pipe(
      map(action => action.map(value => {
        const id = value.payload.doc.id;
        const data = value.payload.doc.data() as IUser;
        return {id, ...data}
      }))
    )
  
  }

  // Returns all users in the collection in an array
  getUsers(): Observable<IUser[]> {
    return this.users;
  }
   
  // returns a specific user object
  getUser(id: string): Observable<IUser> {
    return this.usersCollection.doc<IUser>(id).valueChanges();
  }
  
  // Deletes a user from the collection but not from the Auth State
  deleteUser(id: string): Promise<void> {
    return this.usersCollection.doc(id).delete();
  }

  // Updates a user object
  updateUser(id: string, data) {
    return this.usersCollection.doc(id).update(data);
  }

  
}
