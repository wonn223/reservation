import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../services/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core/src/zone/ng_zone';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Token } from '../models/token';
import { Restaurant, SearchedVal } from '../models/searchedRes';
import { Source } from '../models/eventEmitter';
import { error } from 'util';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';


class User {
  constructor(
    public userid: string,
    public username: string,
    public password: string,
    public password2: string
  ) { }
}

interface Login {
  isLogin: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  map: Restaurant[];

  searchResult: Restaurant;

  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  loginComp: TemplateRef<any>;
  template: TemplateRef<any>;

  isActivated = false;
  isLoggined = false;
  message: string;

  headerSearchInput: FormControl = new FormControl('');
  InputSubscription: Subscription;
  getUrl = 'http://api.booki.kr/restaurants/';

  getUserSearchInput() {
    this.InputSubscription = this.headerSearchInput.valueChanges
    .do(console.log)
    .debounceTime(2000)
    .switchMap( (searchResult: string) => this.getRestaurantData(searchResult))
    .subscribe( (result) => {
      this.searchResult = null;
      this.searchResult = result;
      console.log(this.searchResult);
    });
  }

  getRestaurantData(searchResult): Observable<Restaurant> {
    // ?q=dummy
    console.log(searchResult);
    return this.http.get(this.getUrl + '?q=' + searchResult)
    // ()를 안 감싸면 객체 프로퍼티가 레이블로 인식된다.
    .map( (result: SearchedVal) => ( this.map = result.results))
    .do(console.log)
    .catch( (err) => {
      if (err === 404) {
        console.log('자료가 없어욘');
        return Observable.of<Object>(err);
      } else {
        throw err;
      }
    });
  }

  onblur() {
    console.log('mouseout');
  }

  onOpen(evt: Source) {
    console.log('source from eventEmitter', evt);
    return (evt.bool || evt.token) ? this.isLoggined = evt.bool : '';
  }

  addClass () {
    console.log('addClass');
    this.isActivated = !this.isActivated;
  }

  removeClass(template) {
    console.log('test', !this.isActivated);
    return this.isActivated = !this.isActivated;
  }


  openModal(loginComp: TemplateRef<any>) {
    this.auth.templateRef = loginComp;
    this.modalRef = this.modalService.show(loginComp, { class : 'modal-con'});
    this.auth.headerModalRef = this.modalRef;
  }

  openModal2(loginComp: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(loginComp, { class: 'second' });
  }

  openModal3(loginComp: TemplateRef<any>) {
    this.modalRef3 = this.modalService.show(loginComp);
  }

  closeModal(loginComp: TemplateRef<any>) {
    this.modalRef.hide();
    this.modalRef = null;
  }

  signout() {
    this.auth.signout()
    .subscribe(
      () => {
        this.isLoggined = false;
        alert('방문해주셔서 감사합니다');
        this.router.navigate(['main']);
      },
      (err) => {
        console.log(err.message);
        this.message = err.message;
      },
      () => {
        console.log('completed');
      });
  }

  constructor(private modalService: BsModalService, private router: Router,
              private auth: AuthService,
              private cd: ChangeDetectorRef,
              private http: HttpClient) {

      setTimeout(( ) => {
      console.log('[컨스트럭터 isLoggined]', this.isLoggined === true);
      this.cd.detectChanges();
    }, 5000);
  }

  ngOnInit() {
    console.log('oninit');
    const that = this;
    this.initUser();
    (this.auth.token && this.auth.myPk) ? (function() {
      console.log('새로고침 후 로그인 상태 풀리는지 체크');
      that.isLoggined = true;
    })() : that.isLoggined = false;

    this.getUserSearchInput();

    console.log('oninit terminated');
  }

  initUser() {
    this.user = new User('', '', ' ', ' ');
  }

}
