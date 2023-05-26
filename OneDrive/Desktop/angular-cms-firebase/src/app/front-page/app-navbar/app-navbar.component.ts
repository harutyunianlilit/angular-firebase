import { Component } from '@angular/core';
import { AfService } from '../../providers/af.service';
import { MenusService } from 'src/app/service/menus/menus.service';
import { User } from '../../providers/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css'],
})
export class FrontNavbarComponent {
  page: any;
  user: User | null = null;
  menusList: any;
  constructor(public AfService: AfService, private menus: MenusService) {}

  ngOnInit() {
    this.AfService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.menus.getMenus().subscribe((menus) => {
      this.menusList = menus;
  
    });
  }
}
