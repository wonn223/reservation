import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-steptwo',
  templateUrl: './steptwo.component.html',
  styleUrls: ['./steptwo.component.css']
})
export class SteptwoComponent implements OnInit {

  isHover = false;
  checkActivated = false;
  foodCategory = ['hansik', 'jungsik', 'ilsik', 'yangsik', 'byeolsik'];
  headerValue = ['한식'];
  eventStorage = [];
  stepVal = [];
  state = 'inactive';
  pageScr;


  constructor() {
  }

  check(fd, event) {
    // 이전에 다른 곳에서 체크 표시가 있을 경우
    fd.checkActivated = !this.checkActivated;
  }

  hover(food) {
    if (food.classList[3] === this.foodCategory[food.id]) {
      food.isHover = true;
    }
  }

  ngOnInit() {
  }

}
