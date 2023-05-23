import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Post {
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private PostsCollection: AngularFirestoreCollection<Post>;

  constructor(private afs: AngularFirestore) {
    this.PostsCollection = this.afs.collection<Post>('Posts');
  }

  getPosts(): Observable<Post[]> {
    return this.PostsCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Post>[]) => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addPost(Post: Post): Promise<any> {
    return this.PostsCollection.add(Post);
  }

  deletePost(PostId: string): Promise<void> {
    return this.PostsCollection.doc(PostId).delete();
  }

  updatePost(PostId: string, Post: Post): Promise<void> {
    return this.PostsCollection.doc(PostId).update(Post);
  }
}
