import { Component, OnInit, TemplateRef} from '@angular/core';
import { ShopListService } from '../shop-service.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { shopInfo, timeList } from '../models/shopInfo';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


interface resList {
  id: number;
  time: number;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  // 예약네비 정보를 받고 결제창 이동시 정보를 담을 변수를 정의함
  willVisitPeople:number;
  willVisitTime:any;
  reservationPrice:number;

  // data picker
  minDate = new Date();
  maxDate = new Date(2018, 9, 15);

  // data picker 설정을 위한 타입
  bsConfig: Partial<BsDatepickerConfig>;

  // 인원의 최대값이 number로 들어오면 *ngFor로 리스트를 출력하기 위해서는 arry로 변환이 필요함.
  // ex) for(i = 1; i<number+1; i++) { arry.push(i); };

  //test 이미지 url
  images = ["http://img.insight.co.kr/upload/2014/12/19/ART141219075215.jpg",
    "http://cfile27.uf.tistory.com/image/20055D4D4D94104230AA52",
    "http://cfile24.uf.tistory.com/image/11110B424F92C0E11A97CA"]

  bsValue: Date = new Date();  //선택한 날짜가 담겨있는 변수
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];

  
  appUrl = environment.apiUrl;
  shop: shopInfo;

  // collapsed (예약 가능시간 조회화면)

  isCollapsed: boolean = true;
  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  // 확인 모달

  modalRef: BsModalRef;

  constructor(public shopListService: ShopListService, 
    public modalService: BsModalService,
    public http: HttpClient) { }
  

  // shop view에 필요한 내용들 직접가져오기 (pk는 메인페이지 클릭할 때 전달받아야함)
  shopPk = 1
  shopName: string
  shopDescription: string
  shopAddress: string
  shopTel:number
  latitude:number
  longitude:number
  mapLink: any 
  operationTime: any
  averagePrice: string
  maxParty: number
  starRate: number
  AvailableTime: any;


  getShop(shopPk:number) {
    console.log(this.appUrl)
    this.http.get<shopInfo>(`${this.appUrl}/restaurants/${shopPk}`)
      .subscribe(shopInfo => { 
        this.shop = shopInfo;
        this.shopName = shopInfo.name;
        this.shopDescription = shopInfo.description;
        this.shopAddress = shopInfo.address;
        this.latitude = parseInt(shopInfo.geolocation.split(",")[0]);
        this.longitude = parseInt(shopInfo.geolocation.split(",")[1]);
        this.shopTel = shopInfo.contact_number;
        this.operationTime = shopInfo.business_hours;
        this.mapLink = `http://maps.google.com/maps?f=d&daddr=${this.latitude},${this.longitude}&sspn=0.2,0.1&nav=1`
        this.averagePrice = shopInfo.average_price
        this.maxParty = shopInfo.maximum_party
        this.starRate = shopInfo.star_rate;
        if(shopInfo.average_price == "c"){this.reservationPrice = 10000} 
        else if(shopInfo.average_price == "n"){this.reservationPrice = 15000}
        else if (shopInfo.average_price == "e"){this.reservationPrice = 20000}
        else {this.reservationPrice = 30000} 
       }
      );
  }
   
  // 예약가능시간 조회
  times: any;
  getAvailableTime(){
    let selectedOption = {
      party: this.willVisitPeople,
      year: this.bsValue.getFullYear(),
      month: this.bsValue.getMonth() + 1,
      date: this.bsValue.getDate()
    }

    this.http.get<timeList[]>(`http://zinzi.booki.kr/restaurants/${this.shopPk}/check_opened_time/?party=${selectedOption.party}&amp;date=${selectedOption.year}-${selectedOption.month}-${selectedOption.date}`)
      .subscribe(getTime => {
        this.times = getTime.map(list => Object.assign({}, {time: list.time, timePk: list.pk}))
        console.log(this.times)        
      })
  }

  ngOnInit() {
    this.getShop(this.shopPk);
    this.shopListService.getShop(this.shopPk)
    this.bsConfig = Object.assign({}, { containerClass: 'theme-red' });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  collapseTrue() {
    this.isCollapsed = true;
  }
  collapseAlert(){
    if (this.willVisitPeople) { this.isCollapsed = !this.isCollapsed}
    else{alert("예약인원을 선택해주세요")}
  }

// 서버로 예약정보를 전송하는 함수
  pushReservationInfo() {
    this.shopListService.resInfo =
      {timePk: this.willVisitTime.timePk, shopName: this.shopName, people: this.willVisitPeople, price: this.reservationPrice, date: this.bsValue}
  }
}
