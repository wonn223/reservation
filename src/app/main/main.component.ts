import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})

export class MainComponent implements OnInit {

  isHover = false;
  checkActivated = false;
  foodCategory = ['hansik', 'jungsik', 'ilsik', 'yangsik', 'byeolsik'];
  headerValue = ['한식', '중식', '일식', '양식', '주류/별식'];
  eventStorage = [];
  stepVal = [];
  state = 'inactive';
  pageScr;

  // 내장 객체 Window
  public _window: Window;


  constructor(public router: Router, public auth: AuthService) {
  }

  check(fd, event) {
    // 이전에 다른 곳에서 체크 표시가 있을 경우
    console.log(event);
    fd.checkActivated = !this.checkActivated;
  }

  ngOnInit() {
    console.log(this.auth.getToken());
  }

}
