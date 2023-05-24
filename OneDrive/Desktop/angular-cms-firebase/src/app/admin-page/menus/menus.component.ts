import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MenusService, Menu } from 'src/app/service/menus/menus.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  dataSource = new MatTableDataSource<Menu>();
  displayedColumns = ['id', 'title', 'url', 'actions'];
  menuDetails: Menu = {
    title: '',
    url: ''
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private menusService: MenusService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.menusService.getMenus().subscribe((data: Menu[]) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addMenu(): void {
    this.menusService.addMenu(this.menuDetails);
  }
  editMenu(menuId:string, menu: Menu) {
    this.menusService.updateMenu(menuId, menu)
  }

  deleteMenu(menuId: string): void {
    this.menusService.deleteMenu(menuId);
  }

  openDialog(menuId: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { menuId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('The dialog was closed' + menuId);
        this.deleteMenu(menuId);
      }
    });
  }

  openEditDialog(menuId: string, title: string, url: string): void {
    const dialogRef = this.dialog.open(EditMenuComponent, {
      data: { title, url }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The Edit dialog was closed');

        this.editMenu(menuId, result)
      }
    });
  }


}
