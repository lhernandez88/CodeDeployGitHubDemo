import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';

import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

import { MaterialModule } from '../material/material.module';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './footer/footer.component';

import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = []; 

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SidenavListComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    MaterialModule,

    FlexLayoutModule,

    HttpClientModule
  ],
  exports: [
    LayoutComponent, 
    RouterModule,
    HeaderComponent,
    SidenavListComponent,
    FooterComponent
  ], 
  providers: [
    AuthService
  ]
})
export class LayoutModule { }
