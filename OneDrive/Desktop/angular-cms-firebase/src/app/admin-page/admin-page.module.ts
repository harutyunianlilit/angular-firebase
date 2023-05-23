import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AdminRoutingModule } from './admin-routing-module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminPageComponent } from './admin-page.component';
import { AppNavbarComponent } from '../app-navbar/app-navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenusComponent } from './menus/menus.component';
import { PostsComponent } from './posts/posts.component';



@NgModule({
  declarations: [
    DashboardComponent, AdminPageComponent, AppNavbarComponent, MenusComponent, PostsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule


  ],

})
export class AdminPageModule { }
