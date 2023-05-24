import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PagesListComponent } from './pages-list/pages-list.component';
import { FrontPageComponent } from './front-page.component';





const routes: Routes = [
{
  path: '',
  component: FrontPageComponent,
  children: [
    {
      path: 'home',
      component: HomePageComponent
    },


    { path: 'article', component: PagesListComponent },

    {
      path: '**',
      redirectTo: 'home',

    }
  ]


}
];


export const FrontRoutingModule = RouterModule.forChild(routes);
