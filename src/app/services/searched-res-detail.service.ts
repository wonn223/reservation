import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class SearchedResDetailService {

  resPk: number;
  sub: any;
  constructor(public route: ActivatedRoute) {

   }



}
