import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PostsService, Post } from 'src/app/service/posts/posts.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { MenusService } from 'src/app/service/menus/menus.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  dataSource = new MatTableDataSource<Post>();
  displayedColumns = ['id', 'title', 'menu_id', 'content', 'actions'];
  postDetails: Post = {
    title: '',
    menu_id: '',
    content: ''
  };
  menusList: any[] = [];

  postForm: FormGroup;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private postsService: PostsService, private menusService: MenusService, public dialog: MatDialog, private fb: FormBuilder) {


    this.postForm = this.fb.group({
      title: ['', Validators.required],
      menu_id: ['', Validators.required],
      content: ['', Validators.required]

    })
  }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((data: Post[]) => {
      this.dataSource.data = data;
    });

    this.menusService.getMenus().subscribe((data: any) => {
      this.menusList = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addPost(): void {
    this.postsService.addPost(this.postForm.value);
  }

  editPost(postId: string, post: Post): void {
    this.postsService.updatePost(postId, post);
  }

  deletePost(postId: string): void {
    this.postsService.deletePost(postId);
  }

  openDialog(postId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { postId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('The dialog was closed' + postId);
        this.deletePost(postId);
      }
    });
  }

  openEditDialog(postId: string, title: string, menu_id: string, content: string): void {
    const dialogRef = this.dialog.open(EditPostComponent, {
      data: { title, menu_id, content, 'menus': this.menusList }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The Edit dialog was closed');
        this.editPost(postId, result);
      }
    });
  }
}
