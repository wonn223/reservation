import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { AuthGuard } from '../guards/auth.guard';

import { LoginRoutingModule } from '../login-routing';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent,
    DashboardComponent
  ],
  declarations: [
    LoginComponent,
    DashboardComponent
  ],
  providers: [ AuthGuard ]
})
export class LoginModule { }
