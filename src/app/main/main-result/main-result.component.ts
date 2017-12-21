import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
import { SearchedVal, Restaurant } from '../../models/searchedRes';
import { SearchedResDetailService } from '../../services/searched-res-detail.service';
import { ShopListService } from '../../services/shop-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-result',
  templateUrl: './main-result.component.html',
  styleUrls: ['./main-result.component.css']
})
export class MainResultComponent implements OnInit, OnDestroy  {

  location: string;
  private sub: any;

  searchedval: SearchedVal[];
  restaurantList: Restaurant[];
  thumbnail: string;
  appUrl = 'http://api.booki.kr/restaurants/';

  constructor(public http: HttpClient, public resDetail: SearchedResDetailService, public shop: ShopListService, public route: ActivatedRoute ) {
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
    this.sub = this.route.params.subscribe ( params => {
      this.location = params['location'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
