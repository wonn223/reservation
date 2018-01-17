import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgModel } from '@angular/forms/src/directives/ng_model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { ButtonsModule, BsDatepickerModule, CollapseModule, ModalModule, TabsModule, RatingModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { environment } from '../environments/environment';

import { PaymentComponent } from './payment/payment.component';



const shopRoute: Routes = [
  { path: 'payment', component: PaymentComponent },
];


@NgModule ({
  declarations : [
    PaymentComponent,

  ],
  imports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(shopRoute),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapApiKey }),
  ],
  exports : [RouterModule],
  providers : [BsDatepickerConfig]
})

export class ShopRoutingModule { }
