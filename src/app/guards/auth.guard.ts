import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthService) { }

    canActivate() {
        // 토큰이 존재하는지 확인
        if ( (!this.auth.isAuthenticated())) {
            alert('잘못된 접근 경로입니다');
            return false;
        }
        return true;
    }
}