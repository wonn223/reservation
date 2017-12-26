import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

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
 