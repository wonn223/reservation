import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 컴포넌트 임포트
import { SteponeComponent } from './main/stepone/stepone.component';
import { SteptwoComponent } from './main/steptwo/steptwo.component';
import { StepthreeComponent } from './main/stepthree/stepthree.component';
import { MainComponent } from './main/main.component';
import { MainResultComponent } from './main/main-result/main-result.component';

// 라우트 구성
const routes: Routes = [
  // { path: '' },
  { path: 'main', component: MainComponent },
  { path: 'step1', component: SteponeComponent },
  { path: 'step2', component: SteptwoComponent },
  { path: 'step3', component: StepthreeComponent },
  { path: 'main_result', component: MainResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], /* 모든 라우트 구성을 포함한 모듈을 생성하고 라우팅 모듈에 추가 */
  exports: [RouterModule]
})
export class ReplyRoutingModule { }
