import { Component, OnInit, TemplateRef, Output, NgZone, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Source } from '../models/eventEmitter';
import { User, AuthResponse, FbUser } from '../models/user';
import { AuthService } from '../services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs/Observable';
import { Window } from 'selenium-webdriver';
import { WindowRef } from '@agm/core/utils/browser-globals';

// declare : 타입스크립트가 아닌 파일의 객체에 any타입 부여
declare var window: any;
declare var FB: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
loginForm: FormGroup;
message: string;
modalRef: BsModalRef;
templateRef: TemplateRef<any>;
isError:Boolean = false;
ErrCode:number;
  
@Output() open: EventEmitter<Source> = new EventEmitter();

  constructor(
    private auth: AuthService,
    private router: Router,
    public modalService: BsModalService,
    ) {
      (function(d, s, id) {
        let js: HTMLScriptElement;
        let _js = d.getElementsByTagName(s)[0];
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        // document객체에 script 엘리먼트를 만든다.
        _js = d.createElement(s);
        // double assertion
        // Element타입 => HTMLScriptElement타입
        js = (<HTMLScriptElement> <any>_js);
        // <script id=""></script>
        js.id = id;
        js.src = `https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.11`;
        fjs.parentNode.insertBefore(js, fjs);
        console.log('자바스크립트 링크 완료');
        console.log(js);
        console.log(js.src);
      }(document, 'script', 'facebook-jssdk'));

    }

  signin() {
    console.log('[payload]', this.loginForm.value);
    this.auth.signin(this.loginForm.value)
      .subscribe(
      () => {

        this.open.emit({bool: true, token: this.auth.token});
        this.modalRef.hide();
        this.router.navigate(['step']);
      },
      (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.isError = true;
          this.ErrCode = err.status;
          // 클라이언트 또는 네트워크 에러
          this.message = '가입되지 않은 ID 이거나, 비밀번호를 잘못 입력 하셨습니다.'
          console.log(`Client-side error: ${this.message}`);
        } else {
          // 백엔드가 실패 상태 코드 응답
          console.log(`Server-side error: ${err.status}`);
      }
    },
       ()  => {
         console.log('completed');
       }
      );
  }

  signout() {
    this.auth.signout()
   .subscribe(
     () => {
       this.open.emit({bool: false, token: this.auth.token});
       alert('방문해주셔서 감사합니다');
       this.router.navigate(['main']);
     },
     ( error ) => {
       console.log(error.message);
       this.message = error.message;
     },
     () => {
       console.log('completed');
     });
  }

  FbInit() {
    Promise.resolve(
        FB.init({
          appId            : '232105043996115',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v2.11'
        }))
    .then (
      FB.getLoginStatus((response: AuthResponse) => {
        // switch (response.status) :{
        //   case 'connected':
        //   console.log('dd');
        //   default;
        // }
        console.log(response);
          if (response.status === 'connected' && this.auth.fbPk === undefined) {
            console.log('Logged in.');
            this.open.emit({bool: true});
            this.auth.fbPk = response.authResponse.accessToken;
            this.auth.fbId = response.authResponse.userID;
          } else {
            if (response.status === 'unknown') {
              console.log('unknown상태입니다');
            } else {
              return '';
            }
          }
        })
    );
    // 로그 남기는 메소드
    FB.AppEvents.logPageView();
    // .then();
  }

  keepFbButton() {
    // 페북 버튼 사라짐 방지
    if (FB) {
      // XFBML은 페이스북에서 만든 마크업 언어
      FB.XFBML.parse();
    }
  }

  ngOnInit() {
    this.templateRef = this.auth.templateRef;
    this.modalRef = this.auth.headerModalRef;

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$')
      ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(4)])
     });

    // 버튼 클릭할 때 상태변화가 일어남
    this.FbInit();
    this.keepFbButton();
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
