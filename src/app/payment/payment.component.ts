import { Component, OnInit } from '@angular/core';
import { ShopListService } from '../shop-service.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
declare var jquery: any;
declare var $: any;
declare var IMP: any;


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  amount = this.shopListService.resInfo.people * this.shopListService.resInfo.price;
  name: string   //예약자이름
  tel: string // 예약자전화번호
  mail: string // 예약자 이메일
  reservationPk: number

  // 예약관련 함수와 결제.
  reservationCreat() {
    const payload = {
      "name": "userid",
      "party": this.name,
      "price": this.shopListService.resInfo.price * this.shopListService.resInfo.people,
      "phone_number": this.tel,
      "email": this.mail
    };
    console.log(payload)
    this.payMode()
    // const headers = {
    //   'Content-Type': 'application/json',
    //   'Accept': 'application/json',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    //   'token': '8e4c0b883c763e0cf5e7573ae20276c062f05f46'
    // };
    // this.http.post(this.appUrl, payload, header)
        // .subscribe(res => {
        //   console.log(res)
        // res.id})
  }




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
          url: `/reservations/${this.reservationPk}/payment`, //cross-domain error가 발생하지 않도록 동일한 도메인으로 전송
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
  constructor(public shopListService: ShopListService) { }

  ngOnInit() {

  }

}
