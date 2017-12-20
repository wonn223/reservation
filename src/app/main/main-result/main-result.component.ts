import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
import { SearchedVal, Restaurant } from '../../models/searchedRes';
import { SearchedResDetailService } from '../../services/searched-res-detail.service';
import { ShopListService } from '../../services/shop-service.service';

@Component({
  selector: 'app-main-result',
  templateUrl: './main-result.component.html',
  styleUrls: ['./main-result.component.css']
})
export class MainResultComponent implements OnInit {

  searchedval: SearchedVal[];
  restaurantList: Restaurant[];
  thumbnail: string;
  appUrl = 'http://api.booki.kr/restaurants/';

  constructor(public http: HttpClient, public resDetail: SearchedResDetailService, public shop: ShopListService ) {
    this.getRes();
  }

  getRes() {
    const value = 'n';
    this.http.get<SearchedVal[]>(`${this.appUrl}/?price=${value}`)
     .subscribe( (res: any) => {
       this.searchedval = res;
       this.restaurantList = res.results;
      console.log('[result]', this.restaurantList);
     });
  }

  ngOnInit() {
  }

}
