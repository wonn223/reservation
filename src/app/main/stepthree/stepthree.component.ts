import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SearchedResDetailService } from '../../services/searched-res-detail.service';
import { AuthService } from '../../services/auth.service';
import { TemplateRef } from '@angular/core/src/linker/template_ref';


@Component({
  selector: 'app-stepthree',
  templateUrl: './stepthree.component.html',
  styleUrls: ['./stepthree.component.css']
})
export class StepthreeComponent implements OnInit, OnChanges, OnDestroy  {

  type: string;
  private sub: any;

  isHover = false;
  checkActivated = false;
  location = ['강북구', '강남구', '강서구', '강동구'];
  foodCategory = ['hansik', 'jungsik', 'ilsik', 'yangsik', 'byeolsik'];
  headerValue: string;
  headerTwoValue: string;
  eventStorage = [];
  stepVal: string;
  state = 'inactive';
  pageScr;
  loadingComp: TemplateRef<any>;


  constructor(public route: ActivatedRoute,
              public auth: AuthService,
              public searchedRes: SearchedResDetailService,
              public router: Router
            ) {
    this.headerValue = this.searchedRes.oneheaderValue;
    this.headerTwoValue = this.searchedRes.twoheaderValue;
    console.log(this.searchedRes.oneheaderValue);
  }

  check(evt, comp) {
    this.stepVal = evt.target.textContent.trim();
    console.log('stepval', this.stepVal);
    this.loadingComp = comp;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe ( params => {
      this.type = params['type'];
    });
  }

  ngOnChanges() {
    console.log('뷰 변화');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.auth.openModal(this.loadingComp);
  }

}
