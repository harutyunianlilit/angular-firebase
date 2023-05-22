import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import firebase from 'firebase/compat/app';
import { User } from './user';

import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AfService {
  user$:  Observable<User | null | undefined>;

  constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {
    this.user$ = afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of<User | null>(null);
        }
      })
    ) as Observable<User>;
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider).then((credential) => {
      this.updateUser(credential.user);
    });
  }

  updateUser(user: firebase.User | null) {
    if (user) {
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
      const data: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoUrl: user.photoURL,
        roles: {
          subscriber: true,
          admin: false
        }
      };
      return userRef.set(data, { merge: true });
    } else {

      console.log("User is null");
      return of (null);

    }
  }
   logout() {
    this.afAuth.signOut();
  }
}
