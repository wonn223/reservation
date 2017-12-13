import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
import { SearchedVal, Restaurant } from '../../models/searchedRes';

@Component({
  selector: 'app-main-result',
  templateUrl: './main-result.component.html',
  styleUrls: ['./main-result.component.css']
})
export class MainResultComponent implements OnInit {

  searchedval: SearchedVal[];
  restaurantList: Restaurant[];
  thumbnail: string;
  appUrl = 'http://zinzi.booki.kr/restaurants/';

  constructor(public http: HttpClient) {
    this.getRes();
  }

  getRes() {
    const value = 'n';
    this.http.get<SearchedVal[]>(`${this.appUrl}/?price=${value}`)
     .subscribe( res => {
       this.searchedval = res;
      //  왜 빨간 줄?
      //  this.restaurantList = res.results;
      console.log('[result]', this.thumbnail);
     });
  }

  ngOnInit() {
  }

}
