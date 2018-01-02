import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs/Observable';

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
  constructor(
    private auth: AuthService,
    private router: Router,
    public modalService: BsModalService
    ) {
      // this.modalRef = this.modalService.show(this.templateRef);
    }


  ngOnInit() {
    this.templateRef = this.auth.templateRef;
    this.modalRef = this.auth.headerModalRef;
    console.log(this.templateRef);
    console.log(this.modalRef);
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$')
      ]),
      password: new FormControl('', [ Validators.required, Validators.minLength(4)])
     });
    console.log(this.loginForm);
  }

  signin() {
    console.log('[payload]', this.loginForm.value);
    this.auth.signin(this.loginForm.value)
      .subscribe(
      () => {
        this.modalRef.hide();
        this.router.navigate(['step']);
      },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          this.isError == true;
          this.ErrCode == err.status;
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
    return this.auth.signout()
    .subscribe(
      () => {
        alert('방문해주셔서 감사합니다');
        this.router.navigate(['main']);
      },
      ( error) => {
        console.log(error.message);
        this.message = error.message;
      },
      () => {
        console.log('completed');
      });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

}
 