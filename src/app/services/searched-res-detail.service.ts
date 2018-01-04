import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable()
// 라우터 감지 가드용 서비스
// 유저가 입력한 패러미터와 서버에서 불러온 패러미터들을 비교할 때 쓴다.
export class SearchedResDetailService {

  resPk: number;
  sub: any;
  oneheaderValue: string;
  twoheaderValue: string;

  constructor(public route: ActivatedRoute) {

   }



}
