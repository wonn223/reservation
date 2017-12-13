import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { shopInfo } from './models/shopInfo';




@Injectable()
export class ShopListService {
  shop: shopInfo;
  shopTest = {
    "countFavorite": 2,
    "reviewCount": 3,
  }
  
  appUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  ngOnInit() {
   console.log(this.resInfo)
  }

  // 임시로 예약정보를 가지고 있을 곳. 
  resInfo: any;

  //레스토랑의 정보를 가져오는 서비스
  // shop view에 필요한 내용들 직접가져오기 (pk는 메인페이지 클릭할 때 전달받아야함)
  shopPk = 1
  shopName: string
  shopDescription: string
  shopAddress: string
  shopTel: number
  latitude: number
  longitude: number
  mapLink: any
  operationTime: any
  averagePrice: string
  maxParty: number
  starRate: number
  AvailableTime: any;
  reservationPrice: number;


  getShop(shopPk: number) {
    console.log(this.appUrl)
    this.http.get<shopInfo>(`${this.appUrl}/restaurants/${shopPk}`)
      .subscribe(shopInfo => {
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
        if (shopInfo.average_price == "c") { this.reservationPrice = 10000 }
        else if (shopInfo.average_price == "n") { this.reservationPrice = 15000 }
        else if (shopInfo.average_price == "e") { this.reservationPrice = 20000 }
        else { this.reservationPrice = 30000 }
      }
      );
  }

 

  addFavorite() {
    this.shopTest.countFavorite += 1;
  }
}