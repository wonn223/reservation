import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
  ShopComponent,
  NotFoundComponent,
  PaymentComponent,
  MypageComponent,
  MainComponent,
  // SteponeComponent,
  MainResultComponent,
  ManagepageComponent,
  SteponeComponent
} from './routing-forRouting';
import { AuthGuard } from './guards/auth.guard';


// 라우트 구성
const routes: Routes = [
  { path: 'main', component: MainComponent, children : [
    {
       path: 'signin',
       loadChildren : 'app/login/login.module#LoginModule'
    }
  ] },
  { path: 'step1',
    loadChildren : 'app/main/main.module#MainModule'
  },
  { path: 'shop/:resPk', component: ShopComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'mypage', component: MypageComponent },
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  { path: '', component: MainComponent },
  { path: 'shop/:resPk', component: ShopComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'mypage', component: MypageComponent },
  { path: 'mainresult', component: MainResultComponent },
  { path: 'managepage', component: ManagepageComponent },
  { path: 'step1', component: SteponeComponent },
  { path: '**', component: NotFoundComponent },
];


export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes);
