import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SearchedResDetailService } from '../../services/searched-res-detail.service';


@Component({
  selector: 'app-stepone',
  templateUrl: './stepone.component.html',
  styleUrls: ['./stepone.component.css'],
})
export class SteponeComponent implements OnInit {

  interpolation: string = null;
  isHover = false;
  checkActivated = false;
  foodCategory = ['hansik', 'jungsik', 'ilsik', 'yangsik', 'byeolsik'];
  headerValue = '';
  eventStorage = [];
  stepVal = [];
  price = ['c', 'n', 'e', 'v'];
  state = 'inactive';

  constructor(public router: Router, public http: HttpClient, public searchRes: SearchedResDetailService) { }

  check(fd) {
    // 이전에 다른 곳에서 체크 표시가 있을 경우
    // console.dir(fd.value);
    this.searchRes.oneheaderValue = fd;
  }

  hover(food) {
    console.log('[hovering]', this.foodCategory[food.id]);
    // 레퍼런스 변수의 id값
    if (food.classList[3] === this.foodCategory[food.id]) {
      food.isHover = true;
    }
    console.log(this.isHover);

  }

  ngOnInit() {

  }

}
