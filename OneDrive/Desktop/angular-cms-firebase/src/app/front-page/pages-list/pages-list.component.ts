import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.css'],
})
export class PagesListComponent implements OnInit {
  pagesObservable!: Observable<any[]>;
  async: any;
  constructor(private db: AngularFireDatabase) {}

  ngOnInit(): void {
    this.pagesObservable = this.getPages('/pages');
  }
  getPages(listPath: string): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }
}
