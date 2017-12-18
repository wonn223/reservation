import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {
  MainComponent,
  ShopComponent,
  NotFoundComponent,
  PaymentComponent,
  MypageComponent,
  MainResultComponent,
  ManagepageComponent,
  SteponeComponent
} from './routing-forRouting';



// 라우트 구성
const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'shop/:resPk', component: ShopComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'mypage', component: MypageComponent },
  { path: 'mainresult', component: MainResultComponent },
  { path: 'managepage', component: ManagepageComponent },
  { path: 'step1', component: SteponeComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }