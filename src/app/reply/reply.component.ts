import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Reply, Result, Author, Profile } from '../models/reply';
import { forEach } from '@angular/router/src/utils/collection';
import { AuthService } from '../services/auth.service';
import { Event } from '@angular/router/src/events';


@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
   comment: Result[];
   profile: Profile[];
   profile2: string;
   patchUrl = 'http://api.booki.kr/restaurants/comments';
   removeUrl = 'http://api.booki.kr/restaurants/comments';
   //  ?page=6
   getUrl = 'http://api.booki.kr/restaurants/1/comments/';
   appUrl = 'http://api.booki.kr/accounts/signup/';
   title = 'Review';
   rate = 0;
   // rating 애니메이션
   y: number;
   count1; count2; count3; count4 = 0;
   eventStorage = [];
   cntAll = 0;
   evt = new KeyboardEvent('keyup');
   isActivated = false;
   iconDeactivated = false;
   inputText = '';
   patchRate: number;
   patchedRate: FormGroup;
   startingIndex = 0;
   endIndex = 3;
   itemsPerPage = 5;
   totalItems = 30;
   currentPage = 1;
   txtvalue: string;
   token: string;
   authorPk: number;

  constructor(public http: HttpClient, public fb: FormBuilder, private auth: AuthService) {
    this.getAllcomments();
    this.token = this.auth.getToken();
  }

  onKeyup(com, val: string, rate: number) {
    console.log(com);
  }

  getAllcomments() {
    this.http.get(this.getUrl)
    .subscribe( ( comm: Reply )  =>  {
      this.comment = comm.results;
      this.countAll(comm);
      this.countRating();
      console.log(this.comment);
    });
  }

  getCommentsPerPage(pg: any) {
    console.log(pg);
    console.log('[page number]', pg.page);
    this.http.get(`${this.getUrl}?page=${pg.page}`)
    .subscribe( (comm: Reply) => {
      this.comment = comm.results;
    });
  }

  countRating() {
    // nothing
    this.count1 = this.comment.filter(comm => comm.star_rate <= 2).length;
    this.count2 = this.comment.filter(comm => comm.star_rate > 2 && comm.star_rate <= 3).length;
    this.count3 = this.comment.filter(comm => comm.star_rate > 3 && comm.star_rate <= 4).length;
    this.count4 = this.comment.filter(comm => comm.star_rate > 4 && comm.star_rate <= 5).length;
    this.auth.starAverage = (this.count1 + this.count2 + this.count3 + this.count4)/4;
    // console.log('star', this.auth.starAverage);
  }

  countAll(com: Reply) {
    this.cntAll = com ? com.count : 0;
  }

  getPatchedrate(evt) {
    this.patchRate = evt.target.id;
  }

  returnval() {
    console.log('마우스아웃');
    this.isActivated = !this.isActivated;
  }

  postComments(txt, val: string, rate: number, event: KeyboardEvent) {
    console.dir(event);
      // 코멘트, 별점 미입력 방지
      // '별점을 등록해주세요!' 애니메이션
      // 엔터키 누르는 이벤트 확인
      if (rate === 0) {
        console.log('plz add a star rate');
        return '';
      }

      const payload = {
        comment: val,
        star_rate: this.rate,
      };

      const headers = {
        // 'WWW-Authenticate': 'Token',
        'Authorization': `Token ${this.token}`
      };

      const options = {
        headers : new HttpHeaders(headers)
      };

      console.log('header확인', options);
      ( payload && rate !== 0 && event.key === 'Enter') ?
      this.http.post(this.getUrl, payload, options)
      .subscribe ( (res: any) => {
        this.txtvalue = '';
        this.getAllcomments();
        console.log('profile', this.profile);
        console.log('post 체크', res);
      }) : console.log('error. sth wrong');
  }

  checkCount(starVal: number) {
    this.rate = starVal;
    console.log('별점', this.rate);
  }

  // remove
  removeComm(td: number) {
    // HTTP헤더
    const headers = {
      'Authorization' : `Token ${this.token}`
      };

    const options = {
      headers : new HttpHeaders(headers)
      };
      console.log(options);

    this.http.delete(`${this.removeUrl}/${td}/`, options)
    .subscribe((res) => {
      console.dir(res);
      this.getAllcomments();
      console.log('deleted!');
    });
  }

  // 클래스 바인딩 실행 함수
  changeAct(td:Author, event) {
    const userPk = +this.auth.getUserPk();
    console.log('[userPk]', userPk);

    this.authorPk = td.pk;
    console.log('[commentatorPk]', this.authorPk);

    console.log(event.target.id);

    if ( this.authorPk === userPk ) {
    this.isActivated = !this.isActivated;
    this.iconDeactivated = !this.iconDeactivated;
    } else {
      alert('권한이 없습니다');
    }
  }

  // patch
  patchComm(pk: number, comm: any) {
    // 페이로드
    const payload = {
      comment : comm.value,
      star_rate : this.patchRate
    };

    // HTTP헤더
    const headers = {
      'Authorization' : `'Token' + ' ' + ${this.auth.getToken()}`
    };

    const options = {
      headers : new HttpHeaders(headers)
    };

    console.log(options);
    this.http.patch(`${this.patchUrl}/${pk}/`, payload, options)
    .subscribe(( res ) => {
      console.log('patch result', res);
      this.getAllcomments();
    });
  }

  patchRating(event: any) {
    console.dir(event);
  }

  // css용 editMode 클래스 제거
  removeEditMode() {
    console.log('edited');
    this.isActivated = !(this.isActivated);
  }

  onBoundsChanged(event) {
      console.log(event);
    }


  ngOnInit() {
    this.patchedRate = this.fb.group ({
      rateOne: ['1'],
      rateTwo: ['2'],
      rateThree: ['3'],
      rateFour: ['4'],
      rateFive: ['5'],
    });
  }

}

