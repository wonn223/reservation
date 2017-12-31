import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Response } from '@angular/http';
// import { FormsModule } from '@angular/forms';
import { SearchedVal, Restaurant } from '../../models/searchedRes';
import { SearchedResDetailService } from '../../services/searched-res-detail.service';
import { ShopListService } from '../../services/shop-service.service';
import { AuthService } from '../../services/auth.service';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Result, Reply } from '../../models/reply';

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
  getUrl = 'http://api.booki.kr/restaurants/1/comments/';
  // getStarRaing에서 덧셈을 위한 0 할당
  star_rate:number = 0;
  countRateLength:number = 0;
  percentage:number = 0;

  constructor(public http: HttpClient, public resDetail: SearchedResDetailService,
              public shop: ShopListService, public route: ActivatedRoute, public auth: AuthService ) {
                this.getStarRating()
  }

  // star icon width와 평균 별점 연동
  getStarRating() {
    this.http.get(this.getUrl)
    .subscribe((item: Reply) => {
      item.results.filter( (result) => {
        this.countRateLength += result.star_rate.toString().length;
        this.star_rate += result.star_rate
      })
      return this.percentage = Math.floor(+((this.star_rate/(this.countRateLength * 5) * 100).toFixed())); 
    })
  }


  getRes() {
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
