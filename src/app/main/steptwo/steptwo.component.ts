import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchedResDetailService } from '../../services/searched-res-detail.service';


@Component({
  selector: 'app-steptwo',
  templateUrl: './steptwo.component.html',
  styleUrls: ['./steptwo.component.css']
})
export class SteptwoComponent implements OnInit, OnDestroy {

  // 패러미터 가져오기 위한 변수
  public priceParams: string;
  private sub: any;

  checkActivated = false;
  food = ['kor', 'chn', 'jpn', 'mex', 'amc', 'tha', 'med', 'ita', 'vtn', 'spn', 'ind', 'etc'];
  foodCategory = ['hansik', 'jungsik', 'ilsik', 'yangsik', 'byeolsik'];
  headerValue = ['한식'];
  eventStorage = [];
  stepVal = [];
  state = 'inactive';
  pageScr;


  constructor(public route: ActivatedRoute, public searchedRes: SearchedResDetailService ) {
  }


  check(fd, event) {
    // 이전에 다른 곳에서 체크 표시가 있을 경우
    fd.checkActivated = !(this.checkActivated);
  }

  hover(food) {
    if (food.classList[3] === this.foodCategory[food.id]) {
      food.isHover = true;
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe ( params => {
      this.priceParams = params['priceParams'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
