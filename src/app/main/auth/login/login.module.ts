import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

import { MaterialModule } from '../../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule
  ],
  providers: [
    AuthService,
    StorageService
  ]
})
export class LoginModule { }
