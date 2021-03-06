import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/shareReplay';

import { environment } from '../../environments/environment';

import { User } from '../models/user';
import { Token } from '../models/token';

@Injectable()
export class AuthService {
    appUrl = environment.apiUrl;
    TOKEN_NAME = 'jwt_token';

    constructor(private http: HttpClient) {
        console.log('[appUrl] ', this.appUrl);
    }

    signin(credential: User): Observable<Token> {
        return this.http.post<Token>(`${this.appUrl}/accounts/signin/`, credential)
            .do(res => this.setToken(res.token))
            .shareReplay();
    }

    signout(): void {
        this.removeToken();
    }

    // 토큰 유효성 검증
    isAuthenticated(): boolean {
        const token = this.getToken();
        return token ? true : false;
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
