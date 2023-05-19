import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PagesListComponent } from './pages-list/pages-list.component';


import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { AfService } from './providers/af.service';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';



@NgModule({
  declarations: [AppComponent, PagesListComponent, LoginPageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireModule
  ],
  providers: [AfService],
  bootstrap: [AppComponent],
})
export class AppModule {}
