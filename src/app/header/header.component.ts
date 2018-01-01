import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../services/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core/src/zone/ng_zone';
import { Observable } from 'rxjs/Observable';
import { Token } from '../models/token';
import { Source } from '../models/eventEmitter';
import { error } from 'util';


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
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  loginComp: TemplateRef<any>;
  isActivated = false;
  template: TemplateRef<any>;
  isLoggined = false;
  message: string;

  onblur() {
    console.log('mouseout');
  }

  onOpen(evt: Source) {
    console.log('source from eventEmitter', evt);
    return (evt.bool && evt.token) ? this.isLoggined = !this.isLoggined : '';
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

  constructor(private modalService: BsModalService, public router: Router,
              public auth: AuthService,
              public cd: ChangeDetectorRef ) {
    setTimeout(( ) => {
      console.log('[컨스트럭터 isLoggined]', this.isLoggined === true);
      this.cd.detectChanges();
    }, 5000);
  }

  ngOnInit() {
    console.log('oninit');
    const that = this;
    this.initUser();
    return (this.auth.token && this.auth.myPk) ? (function() {
      console.log('새로고침 후 로그인 상태 체크');
      that.isLoggined = true; })() : '';
  }

  initUser() {
    this.user = new User('', '', ' ', ' ');
  }

}
