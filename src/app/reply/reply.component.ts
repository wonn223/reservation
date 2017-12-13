import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { Reply, Result, Author } from '../models/reply';


@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
   comment: Result[];
   author: Author[];
   patchUrl = 'http://zinzi.booki.kr/restaurants/comments';
   removeUrl = 'http://zinzi.booki.kr/restaurants/comments';
   appUrl3 = 'http://zinzi.booki.kr/restaurants/1/comments/';
   appUrl2 = 'http://zinzi.booki.kr/accounts/signup/';
   title = 'adfs';
   y: number;
   rate = 0;
   count1; count2; count3; count4 = 0;
   eventStorage = [];
   cntAll = 0;


  constructor(public http: HttpClient) {
    this.getcomments();
  }

  getcomments() {
    this.http.get<Reply>(this.appUrl3)
    .subscribe( ( comm )  =>  {
      this.comment = comm.results;
      console.log(this.comment);
      this.countAll();
      this.countRating();
    });
  }


  countRating() {
    this.count1 = this.comment.filter(comm => comm.star_rate <= 1).length;
    this.count2 = this.comment.filter(comm => comm.star_rate <= 2).length;
    this.count3 = this.comment.filter(comm => comm.star_rate <= 3).length;
    this.count4 = this.comment.filter(comm => comm.star_rate <= 4).length;
  }

  countAll() {
    this.cntAll = this.comment ? this.comment.length : 0;
  }

  postComments(val: string, rate) {
      const payload = {
        comment: val,
        star_rate: this.rate,
        // 디테일 페이지 pk값 가져오기
        // restaurant: pk;
      };

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        'token' : 'd55ce71f8aebfe403db07a3d7a99a2c96ddfc100'
      };
      const options = {
        headers : new HttpHeaders(headers)
      };
      console.log('header확인', options);

      this.http.post(this.appUrl3, payload)
        .subscribe((res) => {

          console.dir('[req]', res);

          this.countAll();
          this.countRating();
        });
      // textarea값 엔터값이 포함되서 글자 수 보다 +1
  }


  // remove
  removeComm(td: number) {
    console.log('[td]', td);
    this.http.delete(`${this.removeUrl}/${td}/`)
    .subscribe(() => console.log('deleted!'));
  }

  // patch
  patchComm(td: number, com: string, rate: number) {
    const payload = {
      comment : com,
      star_rate : rate
    };

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'token' : 'd55ce71f8aebfe403db07a3d7a99a2c96ddfc100'
    };
    const options = {
      headers : new HttpHeaders(headers)
    };
    console.log('header확인', options);

    this.http.patch(`${this.patchUrl}/${td}/`, payload, options)
    .subscribe(( res ) => {
      console.log('patched!');
      console.log(res);
    });
  }

  onBoundsChanged(event) {
      console.log(event);
    }


  ngOnInit() {

  }
}
