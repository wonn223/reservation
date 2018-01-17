import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchedResDetailService } from '../services/searched-res-detail.service';

import { MainRoutingModule } from '../main-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule
  ],

  exports : [
  ],
  declarations: [],

  providers : [ SearchedResDetailService ]
})

export class MainModule { }
