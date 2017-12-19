import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchedResDetailService } from '../services/searched-res-detail.service';

import { SteponeComponent } from '../main/stepone/stepone.component';
import { SteptwoComponent } from '../main/steptwo/steptwo.component';
import { StepthreeComponent } from '../main/stepthree/stepthree.component';
import { MainResultComponent } from '../main/main-result/main-result.component';
import { MainRoutingModule } from '../main-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  exports : [
    SteponeComponent,
    SteptwoComponent,
    StepthreeComponent,
    MainResultComponent
  ],
  declarations: [
    SteponeComponent,
    SteptwoComponent,
    StepthreeComponent,
    MainResultComponent
  ],
  providers : [ SearchedResDetailService ]
})
export class MainModule { }
