import { Component, OnInit, OnChanges, TemplateRef, Output, NgZone, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Source } from '../models/eventEmitter';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs/Observable';

declare const window: any;
declare const FB: any;

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
    private zone: NgZone
    ) {
      (function(d, s, id) {
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.11';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      // this.modalRef = this.modalService.show(this.templateRef);

      window.fbasyncInit = () => {
        console.log('check');
        FB.init({
          appId            : 'facebook app id here',
          autoLogAppEvents : true,
          xfbml            : true,
          version          : 'v2.10'
        });
        FB.AppEvents.logPageView();
      };
    }


  signin() {
    console.log('[payload]', this.loginForm.value);
    this.auth.signin(this.loginForm.value)
      .subscribe(
      () => {
        this.open.emit({bool: true, token: this.auth.token} as Source);
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
       this.open.emit(false);
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
    console.log(this.loginForm);
  }

  ngOnChanges() {
    // task 큐에 더 이상 task가 없을 때 알려주는 메소드
    this.zone.onMicrotaskEmpty
    // 루트 존인 NgZone을 구독
      .subscribe(() => {
        // 앵귤러 바깥에서 처리된 태스크를 다시 앵귤러 존으로 진입시키는 역할
        this.zone.run( () => console.log('done'));
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
