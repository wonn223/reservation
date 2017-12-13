import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isHover = false;
  checkActivated = false;
  foodCategory = ['hansik', 'jungsik', 'ilsik', 'yangsik', 'byeolsik'];
  headerValue = ['한식', '중식', '일식', '양식', '주류/별식'];
  eventStorage = [];
  stepVal = [];
  state = 'inactive';

  check(fd, event) {
    // 이전에 다른 곳에서 체크 표시가 있을 경우
    console.log(event);
    fd.checkActivated = !this.checkActivated;
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
  constructor() { }

  ngOnInit() {

  }

}
