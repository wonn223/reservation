import { Component, OnInit } from '@angular/core';
import { ShopListService } from '../services/shop-service.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http/src/backend';
import { AuthService } from '../services/auth.service'
declare var jquery: any;
declare var $: any;
declare var IMP: any;

class PayInfo {
  constructor(public price: number, public uid: string) {};
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payInfo: PayInfo
  appUrl = environment.apiUrl;

  amount = this.shopListService.resInfo.people * this.shopListService.resInfo.price;
  name: string;   // 예약자이름
  tel: string; // 예약자전화번호
  mail: string; // 예약자 이메일
  reservationPk: number;
  imp_uid: string;
  tokenInfo: string;

  //서버로 전달하기
  constructor(public shopListService: ShopListService, public http: HttpClient, public auth: AuthService) {
    this.payInfo = new PayInfo(0, '');
    this.makeTokenInfo();
  }

  ngOnInit() {
    console.log(this.shopListService.resInfo);
  }

  makeTokenInfo() {
    this.tokenInfo = this.auth.getToken();
  }

  // 예약관련 함수와 결제.

  reservationCreat() {
    const payload = {
      "name": this.name,
      "party": this.shopListService.resInfo.people,
      "price": this.amount,
      "phone_number": this.tel,
      "email": this.mail
    };
    //해더의 생성
    // const headers = new HttpHeaders()
    //   .set('Authorization', 'Token be0c1c5b0929bb2937e9976e73524ab45d51609d');

    const headers = {
      // 'WWW-Authenticate' : 'Token',
      'Authorization': `Token ${this.tokenInfo}`
    }
    const options = {
      headers : new HttpHeaders(headers)
    }

    console.log(headers, options)
    
    this.http.post(`${this.appUrl}/reservations/${this.shopListService.resInfo.timePk}/reservation/`, payload, options)
      .subscribe( (info : any) => {
        this.reservationPk = info.pk;
        this.payMode(info.pk, info.price)})
    console.log(payload, headers)
    
  }

  payCreat(uid) {
    const payload = {
      imp_uid: uid,
      price: this.amount
    }
    console.log("createpay:" + payload)

    this.http.post(`${this.appUrl}/reservations/${this.reservationPk}/payment`, payload)
      .subscribe(res => console.log(res))
  }


  // imp UID와 예약정보의 연결방법

  // 결제창을 띄우는 함수
  payMode (reservationPk, price) {
    IMP.init('imp56421298'); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용

    console.log(this);

    const that = this;

    IMP.request_pay({
      pg: "inicis", // version 1.1.0부터 지원.
      pay_method: 'phone',
      merchant_uid: 'merchant_' + new Date().getTime(),
      name: '예약금결제',
      amount: this.amount,
      buyer_email: this.mail,
      buyer_name: this.name,
      buyer_tel: this.tel,
      m_redirect_url: 'http://www.naver.com'
    }, (res) => {
      // console.log('[THIS!!!!!]', this);
      // console.log('[RES]', res);
      // console.log('[HTTP]', this.http);
      this.cb(res);
      
    });
  };

    cb (res) {
      console.log(res);
      const payload = {
        imp_uid: res.imp_uid,
        price: this.amount
      }
      console.log(payload);
      this.http.post(`${this.appUrl}/reservations/${this.reservationPk}/payment/`, payload)
        .subscribe(res => console.log("success"))

      setTimeout("location.href='/'",2000)
    }
}
