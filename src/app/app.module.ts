import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule, BsDatepickerModule, CarouselModule, CollapseModule, ModalModule, TabsModule, RatingModule } from 'ngx-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


import { AppRoutingModule } from './app-routing-module';
import { environment } from '../environments/environment';
import { ShopListService } from './shop-service.service';
import { FilterPipe } from './filter.pipe' ;

import { AppComponent } from './app.component';
import { ContainerComponent } from './container.component';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { ShopComponent } from './shop/shop.component';
import { MainComponent } from './main/main.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentComponent } from './payment/payment.component';
import { LoginComponent } from './login/sign-form-container.component' ;
import { SignFormComponent } from './signForm/sign-form-container.component';
import { MypageComponent } from './mypage/mypage.component';
import { ReplyComponent } from './reply/reply.component'


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
    SignFormComponent,
    FilterPipe,
    MypageComponent,
    ReplyComponent
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
    
  ],
  providers: [ShopListService, BsDatepickerConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
