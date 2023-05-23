import { Component, OnInit, ViewChild } from '@angular/core';
import { MenusService, Menu } from 'src/app/service/menus/menus.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  dataSource = new MatTableDataSource<Menu>();
  displayedColumns = ['id', 'title', 'url'];
  menuDetails: Menu = {
    title: '',
    url: ''
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private menusService: MenusService) {}

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

}
