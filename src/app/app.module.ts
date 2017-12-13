import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, BsDatepickerModule, CarouselModule, CollapseModule, ModalModule, TabsModule, RatingModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


import { AppRoutingModule } from './app-routing-module';
import { environment } from '../environments/environment';
import { ShopListService } from './services/shop-service.service';
import { FilterPipe } from './filter.pipe' ;

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import { JwtHelper } from 'angular2-jwt';

import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { ContainerComponent } from './container.component';
import { HeaderComponent } from '../app/header/header.component';
import { FooterComponent } from './footer.component';
import { ShopComponent } from './shop/shop.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentComponent } from './payment/payment.component';
import { LoginComponent } from './login/login.component' ;
import { SignFormContainerComponent } from './signForm/sign-form-container.component';
import { MypageComponent } from './mypage/mypage.component';
import { ReplyComponent } from './reply/reply.component';
import { LoginRoutingModule } from './login-routing.module';
import { MainResultComponent } from '../app/main/main-result/main-result.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReplyRoutingModule } from './reply.routes';
import { SteponeComponent } from './main/stepone/stepone.component';
import { SteptwoComponent } from './main/steptwo/steptwo.component';
import { StepthreeComponent } from './main/stepthree/stepthree.component';

@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    HeaderComponent,
    FooterComponent,
    ShopComponent,
    MainComponent,
    NotFoundComponent,
    PaymentComponent,
    LoginComponent,
    SignFormContainerComponent,
    FilterPipe,
    MypageComponent,
    ReplyComponent,
    MainResultComponent,
    DashboardComponent,
    SteponeComponent,
    SteptwoComponent,
    StepthreeComponent
  ],
  imports: [
    BrowserModule, FormsModule, ButtonsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapApiKey }),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    RatingModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    LoginRoutingModule,
    ReplyRoutingModule
  ],
  providers: [ShopListService, BsDatepickerConfig, AuthService,
    UserService,
    AuthGuard,
    JwtHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
