import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Menu {
  title: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  private menusCollection: AngularFirestoreCollection<Menu>;

  constructor(private afs: AngularFirestore) {
    this.menusCollection = this.afs.collection<Menu>('menus');
  }

  getMenus(): Observable<Menu[]> {
    return this.menusCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Menu>[]) => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Menu;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addMenu(menu: Menu): Promise<any> {
    return this.menusCollection.add(menu);
  }

  deleteMenu(menuId: string): Promise<void> {
    return this.menusCollection.doc(menuId).delete();
  }

  updateMenu(menuId: string, menu: Menu): Promise<void> {
    return this.menusCollection.doc(menuId).update(menu);
  }
  editMenu(menuId: string, menu: Menu): Promise<void> {
    return this.menusCollection.doc(menuId).update(menu);
  }
}
