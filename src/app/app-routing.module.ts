import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './main/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { 
    path: 'home', 
    component: HomeComponent
  },
  { 
    path: 'login', 
    loadChildren: () => import('./main/auth/login/login.module').then(m => m.LoginModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'corrected' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
