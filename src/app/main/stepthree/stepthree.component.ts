import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SearchedResDetailService } from '../../services/searched-res-detail.service';
import { BsModalService } from 'ngx-bootstrap/modal/bs-modal.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-stepthree',
  templateUrl: './stepthree.component.html',
  styleUrls: ['./stepthree.component.css']
})
export class StepthreeComponent implements OnInit, OnChanges, OnDestroy  {

  type: string;
  private sub: any;

  isHover = false;
  checkActivated = false;
  location = ['강북구', '강남구', '강서구', '강동구'];
  foodCategory = ['hansik', 'jungsik', 'ilsik', 'yangsik', 'byeolsik'];
  headerValue: string;
  headerTwoValue: string;
  eventStorage = [];
  stepVal: string;
  state = 'inactive';
  pageScr;


  constructor(public route: ActivatedRoute,
              public auth: AuthService,
              public searchedRes: SearchedResDetailService,
              public router: Router
            ) {
    this.headerValue = this.searchedRes.oneheaderValue;
    this.headerTwoValue = this.searchedRes.twoheaderValue;
    console.log(this.searchedRes.oneheaderValue);
  }

  check(evt, comp) {
    this.stepVal = evt.target.textContent.trim();
    console.log('stepval', this.stepVal);
    // 로딩 modal
    this.auth.openModal(comp);
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

  ngOnChanges() {
    console.log('뷰 변화');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
