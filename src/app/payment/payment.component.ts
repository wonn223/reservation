import { Component, OnInit } from '@angular/core';
import { ShopListService } from '../services/shop-service.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http/src/backend';
declare var jquery: any;
declare var $: any;
declare var IMP: any;


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  appUrl = environment.apiUrl;

  amount = this.shopListService.resInfo.people * this.shopListService.resInfo.price;
  name: string;   // 예약자이름
  tel: string; // 예약자전화번호
  mail: string; // 예약자 이메일
  reservationPk: number;

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
      'Authorization': 'Token be0c1c5b0929bb2937e9976e73524ab45d51609d'
    }
    const options = {
      headers : new HttpHeaders(headers)
    }

    console.log(headers, options)
    
    this.http.post(`${this.appUrl}/reservations/${this.shopListService.resInfo.timePk}/reservation/`, payload, options)
      .subscribe(info => console.log(info))   //info => this.reservationPk = inof.id 로 변경함.
    console.log(payload, headers)
    this.payMode()
  }


  // imp UID와 예약정보의 연결방법

  // 결제창을 띄우는 함수
  payMode = function () {
    IMP.init('iamport'); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용

    IMP.request_pay({
      pg: "inicis", // version 1.1.0부터 지원.
      pay_method: 'phone',
      merchant_uid: 'merchant_' + new Date().getTime(),
      name: '예약금결제',
      amount: this.amount,
      buyer_email: this.email,
      buyer_name: this.name,
      buyer_tel: this.tel,
      m_redirect_url: 'https://www.yourdomain.com/payments/complete'
    }, function (rsp) {
      if (rsp.success) {

        jquery.ajax({
          url: `${this.appUrl}/reservations/${this.reservationPk}/payment`, //cross-domain error가 발생하지 않도록 동일한 도메인으로 전송
          // /reservations/${this.reservationPk}/payment/
          type: 'POST',
          dataType: 'json',
          data: {
            imp_uid: rsp.imp_uid,
            //기타 필요한 데이터가 있으면 추가 전달
            price: this.amount
          }
        })

        var msg = '결제가 완료되었습니다.';
        msg += '고유ID : ' + rsp.imp_uid;
        msg += '상점 거래ID : ' + rsp.merchant_uid;
        msg += '결제 금액 : ' + rsp.paid_amount;
        msg += '카드 승인번호 : ' + rsp.apply_num;
      } else {
        var msg = '결제에 실패하였습니다.';
        msg += '에러내용 : ' + rsp.error_msg;
      }
      alert(msg);
    });
  }


  //서버로 전달하기
  constructor(public shopListService: ShopListService, public http: HttpClient) { }

  ngOnInit() {
    console.log(this.shopListService.resInfo)

  }

}
