import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
message: string;

  constructor(
    private auth: AuthService,
    private router: Router) { }


  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$')
      ]),
      password: new FormControl('',[ Validators.required, Validators.minLength(4)])
     });
    console.log(this.loginForm);
  }

  signin(){
    console.log('[payload]', this.loginForm.value);
    this.auth.signin(this.loginForm.value)
      .subscribe(
      () => this.router.navigate(['dashboard']),
      ({ error }) => {
        console.log(error.message);
        this.message = error.message;
      }
      );

  }
  signout(){
    return this.auth.signout()
    .subscribe(
      () => this.router.navigate(['signin']),
      ({ error }) => {
        console.log(error.message);
        this.message = error.message;
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

}
 