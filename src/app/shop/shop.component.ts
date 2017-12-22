import { Component, OnInit, OnDestroy, TemplateRef} from '@angular/core';
import { ShopListService } from '../services/shop-service.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ShopInfo, TimeList } from '../models/shopInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHandler } from '@angular/common/http/src/backend';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// interface ResList {
//   id: number;
//   time: number;
// }

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit, OnDestroy {
  // 예약네비 정보를 받고 결제창 이동시 정보를 담을 변수를 정의함
  willVisitPeople: number;
  willVisitTime: any;
  reservationPrice: number;
  // data picker
  minDate = new Date();
  maxDate = new Date(2018, 9, 15);

  // 예약가능시간 조회
  times: any;

  public resPk: number;
  private sub: any;

  // data picker 설정을 위한 타입
  bsConfig: Partial<BsDatepickerConfig>;

  // 인원의 최대값이 number로 들어오면 *ngFor로 리스트를 출력하기 위해서는 arry로 변환이 필요함.
  // ex) for(i = 1; i<number+1; i++) { arry.push(i); };

  // test 이미지 url


  bsValue: Date = new Date();  // 선택한 날짜가 담겨있는 변수
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];


  appUrl = environment.apiUrl;
  shop: ShopInfo;

  // collapsed (예약 가능시간 조회화면)

  isCollapsed = true;

  toggleStatus = 'btn btn-lg btn-danger';

  // 확인 모달

  modalRef: BsModalRef;
  // shop view에 필요한 내용들 직접가져오기 (pk는 메인페이지 클릭할 때 전달받아야함)
  shopPk = this.resPk;
  shopName: string;
  shopDescription: string;
  shopAddress: string;
  shopTel: number;
  latitude: number;
  longitude: number;
  mapLink: any ;
  operationTime: any;
  averagePrice: string;
  maxParty: number;
  starRate: number;
  AvailableTime: any;
  menu: string;
  images: any;

  constructor(public shopListService: ShopListService,
    public modalService: BsModalService,
    public http: HttpClient,
    public route: ActivatedRoute
    ) {  }

  collapsed(event: any): void {
      // console.log(event);
    }

  expanded(event: any): void {
      // console.log(event);
    }


  getShop(shopPk: number) {
    Observable
    console.log(this.appUrl);
    this.http.get<ShopInfo>(`${this.appUrl}/restaurants/${this.resPk}`)
      .subscribe((shopInfo: ShopInfo) => {
        this.shop = shopInfo;
        this.shopName = shopInfo.name;
        this.shopDescription = shopInfo.description;
        this.shopAddress = shopInfo.address;
        this.latitude = parseInt(shopInfo.geolocation.split(',')[0]);
        this.longitude = parseInt(shopInfo.geolocation.split(',')[1]);
        this.shopTel = shopInfo.contact_number;
        this.operationTime = shopInfo.business_hours;
        this.mapLink = `http://maps.google.com/maps?f=d&daddr=${this.latitude},${this.longitude}&sspn=0.2,0.1&nav=1`;
        this.averagePrice = shopInfo.average_price;
        this.maxParty = shopInfo.maximum_party;
        this.starRate = shopInfo.star_rate;
        this.images = shopInfo.images.map((image:any)=>image.image)
        this.menu = shopInfo.menu;
        if(shopInfo.average_price == "c"){this.reservationPrice = 10000} 
        else if(shopInfo.average_price == "n"){this.reservationPrice = 15000}
        else if (shopInfo.average_price == "e"){this.reservationPrice = 20000}
        else {this.reservationPrice = 30000} 
       }
      );
  }

  // 즐겨찾기 버튼

  favoriteToggle() {
    const payload = { };

    const headers = {
      // 'WWW-Authenticate' : 'Token',
      'Authorization': 'Token be0c1c5b0929bb2937e9976e73524ab45d51609d'
    };

    const options = {
      headers: new HttpHeaders(headers)
    };

    this.http.post(`${this.appUrl}/reservations/${this.resPk}/favorite-toggle/`, payload, options)
      .subscribe((toggleStatus: any) => {
        console.log(toggleStatus);
        if (toggleStatus.result === true) {
          this.toggleStatus = 'btn btn-lg btn-danger';
        } else { this.toggleStatus = 'btn btn-lg btn-default'; }
      });
  }
  
  
  favoriteStatus() {
    const payload = {}

    const headers = {
      // 'WWW-Authenticate' : 'Token',
      'Authorization': 'Token be0c1c5b0929bb2937e9976e73524ab45d51609d'
    }
    const options = {
      headers: new HttpHeaders(headers)
    }

    this.http.get(`${this.appUrl}/reservations/${this.resPk}/favorite-toggle/`, options)
      .subscribe((toggleStatus: any) => {
        console.log(toggleStatus)
        if (toggleStatus.result === true) {
          this.toggleStatus = "btn btn-lg btn-danger"
        } else { this.toggleStatus = "btn btn-lg btn-default" }
      })
  }
  // 예약가능시간 조회

  getAvailableTime() {
    const selectedOption = {
      party: this.willVisitPeople,
      year: this.bsValue.getFullYear(),
      month: this.bsValue.getMonth() + 1,
      date: this.bsValue.getDate()
    };

    this.http.get<TimeList[]>(`http://api.booki.kr/restaurants/${this.resPk}/check_opened_time/?party=${selectedOption.party}&amp;date=${selectedOption.year}-${selectedOption.month}-${selectedOption.date}`)
      .subscribe(getTime => {
        this.times = getTime.map(list => Object.assign({}, {time: list.time, timePk: list.pk}));
        console.log(this.times);
      });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.resPk = +params['resPk'];
    });
    this.getShop(this.resPk);
    this.favoriteStatus();
    this.bsConfig = Object.assign({}, { containerClass: 'theme-red' });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  collapseTrue() {
    this.isCollapsed = true;

  }
  collapseAlert() {
    if (this.willVisitPeople) { this.isCollapsed = !this.isCollapsed; } else {
      alert('예약인원을 선택해주세요');
    }
  }

// 서버로 예약정보를 전송하는 함수
  pushReservationInfo() {
    this.shopListService.resInfo = {
      timePk: this.willVisitTime.timePk, shopName: this.shopName, people: this.willVisitPeople, price: this.reservationPrice, date: this.bsValue
    };
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
