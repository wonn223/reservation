import { Component, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { SearchedVal, Restaurant, SearchingArchive } from '../../models/searchedRes';

import { SearchedResDetailService } from '../../services/searched-res-detail.service';
import { ShopListService } from '../../services/shop-service.service';
import { AuthService } from '../../services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Result, Reply } from '../../models/reply';
import { error } from 'util';


@Component({
  selector: 'app-main-result',
  templateUrl: './main-result.component.html',
  styleUrls: ['./main-result.component.css']
})
export class MainResultComponent implements OnInit, OnDestroy  {

  location: string;
  type: string;
  price: string;
  searchingArchive: SearchingArchive;
  private sub: any;

  searchedval: SearchedVal;
  restaurantList: Restaurant[];
  thumbnail: string;
  appUrl = 'http://api.booki.kr/restaurants/';
  getUrl = 'http://api.booki.kr/restaurants/1/comments/';

  // getStarRaing에서 덧셈을 위한 0 할당
  star_rate = 0;
  countRateLength = 0;
  percentage = 0;

  constructor(public http: HttpClient, public resDetail: SearchedResDetailService,
              public route: ActivatedRoute, public router: Router,
              public auth: AuthService, public shop: ShopListService,
              public modal: BsModalService) {
                this.getStarRating();
             }

  // star icon width와 평균 별점 연동
  getStarRating() {
    this.http.get(this.getUrl)
    .subscribe((item: Reply) => {
      item.results.filter( (result) => {
        this.countRateLength += result.star_rate.toString().length;
        this.star_rate += result.star_rate;
      });
      return this.percentage = Math.floor(+((this.star_rate / (this.countRateLength * 5) * 100).toFixed())); 
    });
  }


  getRes() {
    this.http.get<SearchedVal>(`${this.appUrl}/?price=${this.price}&type=${this.type}&district=${this.location}`)
     .subscribe( (res: SearchedVal ) => {
       console.log(res);
      if (res.results.length === 0) {

        this.router.navigate(['notfound']);

        return console.log('검색결과가 없습니다');
      }
      this.searchedval = res;
      this.restaurantList = res.results;
      this.thumbnail = this.restaurantList[0].thumbnail;

      console.log('[result]', this.restaurantList);
     },
    (err: Response) => {
      console.log(err.status);
      err.statusText = 'error 메시지';
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe ( (params: SearchingArchive[] ) => {
      console.log(params);
<<<<<<< HEAD
      this.auth.authArchive = params;

      console.log(this.auth.authArchive);

=======
      this.auth.authArichive = params;
      
>>>>>>> e8ac11d1c68c5753d65400e7bf5283c9da49b8d2
      this.location = params['location'];
      this.price = params ['priceParams'];
      this.type = params ['type'];

    });

    this.getRes();

    setTimeout(() => {
      this.auth.modalRef.hide();
      console.log('닫음');
    } , 3000);

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
