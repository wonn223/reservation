import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../services/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core/src/zone/ng_zone';
import { Observable } from 'rxjs/Observable';
import { Token } from '../models/token';


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

  onOpen(evt) {
    console.log(evt);
    this.isLoggined = !this.isLoggined;
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
    console.log(this.auth.templateRef);
    console.log(this.auth.headerModalRef);

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
      (error) => {
        console.log(error.message);
        this.message = error.message;
      },
      () => {
        console.log('completed');
      });
  }


  constructor(private modalService: BsModalService, public router: Router,
              public auth: AuthService,
              public cd: ChangeDetectorRef ) {
    console.log('rertry');
    setTimeout(( ) => {
      console.log('[컨스트럭터 isLoggined]', this.isLoggined === true);
      this.cd.detectChanges();
    }, 5000);
  }

  ngOnInit() {
    this.initUser();
  }

  initUser() {
    this.user = new User('', '', ' ', ' ');
  }

}
