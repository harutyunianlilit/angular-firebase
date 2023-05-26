import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  QueryFn,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { from } from 'rxjs';

export interface Post {
  title: string;
  menu_id: string;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly postsCollection = this.firestore.collection<Post>('posts');

  constructor(private firestore: AngularFirestore) {}

  getPosts(): Observable<Post[]> {
    return this.postsCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Post>[]) => {
        return actions.map((a) => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getConditionalPosts(
    field: string,
    condition: any,
    value: string
  ): Observable<Post[]> {
    const query = this.postsCollection.ref.where(field, condition, value).get();
    return from(query).pipe(
      map(
        (
          snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
        ) => {
          return snapshot.docs.map((doc) => {
            const data = doc.data() as Post;
            const id = doc.id;
            return { id, ...data };
          });
        }
      )
    );
  }

  addPost(post: Post): Promise<any> {
    return this.postsCollection.add(post);
  }

  deletePost(postId: string): Promise<void> {
    return this.postsCollection.doc(postId).delete();
  }

  updatePost(postId: string, post: Post): Promise<void> {
    return this.postsCollection.doc(postId).update(post);
  }
}
