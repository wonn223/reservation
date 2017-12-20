import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-stepone',
  templateUrl: './stepone.component.html',
  styleUrls: ['./stepone.component.css'],
})
export class SteponeComponent implements OnInit {

  isHover = false;
  checkActivated = false;
  foodCategory = ['hansik', 'jungsik', 'ilsik', 'yangsik', 'byeolsik'];
  headerValue = '';
  eventStorage = [];
  stepVal = [];
  price = ['c', 'n', 'e', 'v'];
  state = 'inactive';

  constructor(public router: Router, public http: HttpClient) { }

  check(fd) {
    // 이전에 다른 곳에서 체크 표시가 있을 경우
    console.log(fd);
    this.headerValue = fd.classList[3];
    fd.checkActivated = !this.checkActivated;
  }

  hover(food) {
    // this.eventStorage = event;
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

  }

}
