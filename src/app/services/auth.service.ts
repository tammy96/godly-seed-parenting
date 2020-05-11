import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  addUserToDatabase(userData: firebase.auth.UserCredential) {
    this.afs.collection('users').doc(userData.user.uid).set({
      name: userData.user.displayName,
      photoUrl: userData.user.photoURL,
      email: userData.user.email
    })
  }

  addUserToDatabaseFromEmailLogin(user: firebase.auth.UserCredential, userData) {
    this.afs.collection('users').doc(user.user.uid).set(userData);
  }
  

  loginFacebook() {
    this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((res) => {
        this.addUserToDatabase(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  loginGoogle() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((res) => {
      this.addUserToDatabase(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  emailPasswordLogin(email : string, password : string) : Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  createUserWithEmailPassword(email : string, password : string) : Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

}
