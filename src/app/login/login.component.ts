import { Component, OnInit, OnChanges, TemplateRef, Output, NgZone, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Source } from '../models/eventEmitter';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs/Observable';
import { Window } from 'selenium-webdriver';
import { WindowRef } from '@agm/core/utils/browser-globals';

// declare : 타입스크립트가 아닌 파일의 객체에 any타입 부여
declare let window: any;
// declare let FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnChanges {
loginForm: FormGroup;
message: string;
modalRef: BsModalRef;
templateRef: TemplateRef<any>;

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
      ({ error }) => {
        console.log(error.message);
        this.message = error.message;
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
 
     console.log(window.fb);

     window.fbasyncInit = () => {
      console.log('check');
      window.FB.init({
        appId            : '232105043996115',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.11'
      });

    window.FB.AppEvents.logPageView();
    console.log('check2');
    };

    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }

  ngOnChanges() {
    // task 큐에 더 이상 task가 없을 때 알려주는 메소드
    // this.zone.onMicrotaskEmpty
    // 루트 존인 NgZone을 구독
      // .subscribe(() => {
        // 앵귤러 바깥에서 처리된 태스크를 다시 앵귤러 존으로 진입시키는 역할
        // this.zone.run( () => console.log('done'));
    // });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
