import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchedResDetailService } from '../../services/searched-res-detail.service';


@Component({
  selector: 'app-stepthree',
  templateUrl: './stepthree.component.html',
  styleUrls: ['./stepthree.component.css']
})
export class StepthreeComponent implements OnInit, OnDestroy  {

  type: string;
  private sub: any;

  isHover = false;
  checkActivated = false;
  location = ['강북구', '강남구', '강서구', '강동구'];
  foodCategory = ['hansik', 'jungsik', 'ilsik', 'yangsik', 'byeolsik'];
  headerValue: string;
  headerTwoValue: string;
  eventStorage = [];
  stepVal = [];
  state = 'inactive';
  pageScr;


  constructor(public route: ActivatedRoute, public searchedRes: SearchedResDetailService) {
    this.headerValue = this.searchedRes.oneheaderValue;
    this.headerTwoValue = this.searchedRes.twoheaderValue;
    console.log(this.searchedRes.oneheaderValue);
  }

  check() {
    // 이전에 다른 곳에서 체크 표시가 있을 경우
    console.log(event);
  }

  hover(food, event) {
    this.eventStorage = event;
    // 마우스 이벤트 발생 = event.target.id활용
    // console.log(this.eventStorage);
    console.log('[hovering]', this.foodCategory[food.id]);
    // 레퍼런스 변수의 id값
    if (food.classList[3] === this.foodCategory[food.id]) {
      food.isHover = true;
    }
    console.log(this.isHover);

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe ( params => {
      this.type = params['type'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
