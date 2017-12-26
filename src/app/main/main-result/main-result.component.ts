import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Response } from '@angular/http';
// import { FormsModule } from '@angular/forms';
import { SearchedVal, Restaurant } from '../../models/searchedRes';
import { SearchedResDetailService } from '../../services/searched-res-detail.service';
import { ShopListService } from '../../services/shop-service.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-main-result',
  templateUrl: './main-result.component.html',
  styleUrls: ['./main-result.component.css']
})
export class MainResultComponent implements OnInit, OnDestroy  {

  location: string;
  type: string;
  price: string;
  private sub: any;

  searchedval: SearchedVal;
  restaurantList: Restaurant[];
  thumbnail: string;
  appUrl = 'http://api.booki.kr/restaurants/';

  constructor(public http: HttpClient, public resDetail: SearchedResDetailService,
              public shop: ShopListService, public route: ActivatedRoute ) {
                console.log('컨스트럭터');
  }

  getRes() {
    // 배열 값을 받아서 map으로 오퍼레이팅 후 값 전달
    console.log(this.price);
    this.http.get<SearchedVal>(`${this.appUrl}/?price=${this.price}&type=${this.type}&district=${this.location}`)
     .subscribe( (res: SearchedVal ) => {
      //  res.json()이 에러나는 이유? 타입에러
       this.searchedval = res;
       this.restaurantList = res.results;
       this.thumbnail = this.restaurantList[0].thumbnail;
      console.log('[result]', this.restaurantList);
     });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe ( params => {
      console.log(params);
      this.location = params['location'];
      this.price = params ['priceParams'];
      this.type = params ['type'];
    });
    this.getRes();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
