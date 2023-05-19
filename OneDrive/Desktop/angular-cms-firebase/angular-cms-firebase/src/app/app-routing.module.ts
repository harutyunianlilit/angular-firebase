import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PagesListComponent } from './pages-list/pages-list.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'pages', component: PagesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
