import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, 
    private afs: AngularFirestore, 
    private matSnackBar: MatSnackBar) { }

  addUserToDatabase(userData: firebase.auth.UserCredential) {
    this.afs.collection('users').doc(userData.user.uid).set({
      name: userData.user.displayName,
      photoURL: userData.user.photoURL,
      email: userData.user.email
    })
  }

  loginSuccess(message: string): MatSnackBarRef<SimpleSnackBar> {
    return this.matSnackBar.open(message, 'Close', {
      duration: 2000
    })
  }

  loginFailed(e): MatSnackBarRef<SimpleSnackBar> {
    return this.matSnackBar.open(e.message, 'Close', {
      duration: 6000
    })
  }

  addUserToDatabaseFromEmailLogin(user: firebase.auth.UserCredential, userData) {
    this.afs.collection('users').doc(user.user.uid).set(userData);
  }
  

  loginFacebook() {
    return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((res) => {
        console.log(res)
        this.addUserToDatabase(res);
        this.loginSuccess('Login Success');
    })
    .catch((err) => {
      console.log(err)
      this.loginFailed(err)
    })
  }

  loginGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((res) => {
      this.addUserToDatabase(res);
      this.loginSuccess('Login Success');
    })
    .catch((err) => {
      console.log(err);
      this.loginFailed(err)
    })
  }

  emailPasswordLogin(email : string, password : string) : Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  createUserWithEmailPassword(email : string, password : string) : Promise<firebase.auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    this.afAuth.signOut().then(() => {
      console.log('Logged Out')
      this.loginSuccess('Logout Successfull')
    }).catch((err) => {
      console.log(err)
      this.loginFailed(err)
    })
  }

}
