import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { IBlog } from '../interface/iBlog';
import { firestore } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  blogCollection: AngularFirestoreCollection<IBlog>;
  blogs: Observable<IBlog[]>;

  constructor(private afs: AngularFirestore) { 

    // A reference to the blogs collection in the database
    // Returns all blogs in an array of objects without the document id
    // Returns an Observable that you'll need to subscribe to

    this.blogCollection = this.afs.collection('blog');

    // Another reference to the blogs collection in the database
    // Returns all blogs in an array of objects with the document is
    this.blogs = this.afs.collection('blog').snapshotChanges().pipe(
      map(action => action.map(value => {
        const id = value.payload.doc.id;
        const data = value.payload.doc.data() as IBlog;
        return {id, ...data}
      }))
    )
  }

  // Method/Function that returns the array of blogs with doc id
  getBlogs() :Observable<IBlog[]> {
    return this.blogs;
  }

  // Add a new blog to the collection
  addBlog(data: IBlog) {
    return this.blogCollection.add(data);
  }

  // Get Specific blog from the collection with the doc id
  getBlog(id) : Observable<IBlog>{
    return this.blogCollection.doc<IBlog>(id).valueChanges();
  }

  // Deletes a specific blog from the collection with the doc id
  deleteBlog(id) {
    return this.blogCollection.doc(id).delete();
  }

  // Updates the value/content of a blog in the collection
  updateBlog(id, data) {
    this.blogCollection.doc(id).update(data);
  }

  addComment(id, data) {
    return this.blogCollection.doc(id).update({
      comments: firestore.FieldValue.arrayUnion(data)
    })
  }
}
