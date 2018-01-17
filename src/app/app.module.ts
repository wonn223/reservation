import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, BsDatepickerModule, CarouselModule, CollapseModule, ModalModule, TabsModule, RatingModule } from 'ngx-bootstrap';
import {BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination/';

import { AgmCoreModule } from '@agm/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { appRouting } from './app-routing-module';
import { environment } from '../environments/environment';
import { ShopListService } from './services/shop-service.service';

import { FilterPipe, PricePipe  } from './filter.pipe';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { FacebookModule } from 'ngx-facebook';

import { AppComponent } from './app.component';
import { ContainerComponent } from './container.component';
import { HeaderComponent } from '../app/header/header.component';
import { FooterComponent } from './footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MypageComponent } from './mypage/mypage.component';
import { MainComponent } from './main/main.component';
import { SignFormContainerComponent } from './signForm/sign-form-container.component';
import { ShopComponent } from './shop/shop.component';

import { ManagepageComponent } from './managepage/managepage.component';
import { LoginComponent } from './login/login.component';
import { ReplyComponent } from './reply/reply.component';
// import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    HeaderComponent,
    LoginComponent,
    ShopComponent,
    ReplyComponent,
    MypageComponent,
    NotFoundComponent,
    FooterComponent,
    MainComponent,
    ManagepageComponent,
    SignFormContainerComponent,
    PricePipe,
    FilterPipe
  ],
  imports: [
    BrowserModule, FormsModule, ButtonsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapApiKey }),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    RatingModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FacebookModule.forRoot(),
    appRouting,
  ],
  providers: [ ShopListService, BsDatepickerConfig, AuthService,
    UserService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
