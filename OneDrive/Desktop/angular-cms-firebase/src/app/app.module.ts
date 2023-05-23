import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PagesListComponent } from './pages-list/pages-list.component';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { AfService } from './providers/af.service';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { HomePageComponent } from './home-page/home-page.component';

import { AdminGuard } from './guards/admin.guard';
import { SubscriberGuard } from './guards/subscriber.guard';
import { MaterialModule } from './material.module';
import { MenusService } from './service/menus/menus.service';
import { PostsService } from './service/posts/posts.service';





@NgModule({
  declarations: [AppComponent, PagesListComponent, LoginPageComponent, HomePageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFirestoreModule,
    MaterialModule,
    BrowserAnimationsModule

  ],
  providers: [AfService, AdminGuard, SubscriberGuard, MenusService, PostsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
