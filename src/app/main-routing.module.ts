import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// 컴포넌트 임포트
import { SteponeComponent } from './main/stepone/stepone.component';
import { SteptwoComponent } from './main/steptwo/steptwo.component';
import { StepthreeComponent } from './main/stepthree/stepthree.component';
import { MainResultComponent } from './main/main-result/main-result.component';


// 라우트 구성
const mainCompRoutes: Routes = [
    { path: '', component: SteponeComponent },
    { path: 'step2', component: SteptwoComponent },
    { path: 'step2/step3', component: StepthreeComponent },
    { path: 'step2/step3/main_result', component: MainResultComponent }
];

@NgModule ({
    declarations : [
        SteponeComponent,
        SteptwoComponent,
        StepthreeComponent,
        MainResultComponent
    ],
    imports: [RouterModule.forChild(mainCompRoutes)],
    exports: [RouterModule]
})


export class MainRoutingModule { }

