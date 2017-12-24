import { Injectable, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { JwtHelper } from 'angular2-jwt';


import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import { environment } from '../../environments/environment';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { User } from '../models/user';
import { Token } from '../models/token';
import { shareReplay } from 'rxjs/operator/shareReplay';

@Injectable()
export class AuthService {
    templateRef: TemplateRef<any>;
    headerModalRef: BsModalRef;
    appUrl = environment.apiUrl;
    TOKEN_NAME = 'drf token';
    token: string = this.getToken();
    myPk: string = this.getUserPk();

    constructor(private http: HttpClient) {
        console.log('[appUrl] ', this.appUrl);
    }

    signin(credential: User): Observable<Token> {
        return this.http.post<Token>(`${this.appUrl}/accounts/signin/`, credential)
            .do(res => {
                this.setToken(res.token);
                console.log(res);
                this.setUserPk(res.user.pk);
            })
            .shareReplay();
    }

    signout() {
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Token ${this.token}`);
        console.log(headers);
        return this.http.post(`${this.appUrl}/accounts/signout/`, null, { headers })

            .do(() => {
                this.removeToken();
                this.removeUserPk();
            })
            .shareReplay();
    }


    setUserPk(pk: string): void {
        localStorage.setItem('Pk', pk);
        console.log('Pk', pk);
    }

    getUserPk(): string {
        return localStorage.getItem('Pk');
    }

    removeUserPk(): void {
        localStorage.removeItem('Pk');
    }


    // 토큰 유효성 검증
    isAuthenticated() {
        const token = this.getToken();
        // return token ? !this.isTokenExpired(token) : false;
    }

    getToken(): string {
        return localStorage.getItem(this.TOKEN_NAME);
    }

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_NAME, token);
        console.log(this.TOKEN_NAME, token);
    }

    removeToken(): void {
        localStorage.removeItem(this.TOKEN_NAME);
    }

    /*
      token 유효 기간 체크
      The JwtHelper class has several useful methods that can be utilized in your components:

      decodeToken
      getTokenExpirationDate
      isTokenExpired

      npm install angular2-jwt
      https://github.com/auth0/angular2-jwt
    */

}


