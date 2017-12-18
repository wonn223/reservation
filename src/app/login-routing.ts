import { NgModule, ModuleWithProviders  } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './guards/auth.guard';

const loginCompRoutes: Routes = [
    { path: 'signin', component: LoginComponent },
    {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [AuthGuard],
            data: { title: 'Dashboard', subtitle: 'JWT Authentication' }
    },
];

export const LoginRoutingModule: ModuleWithProviders = RouterModule.forChild(loginCompRoutes);
