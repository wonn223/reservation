import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShopListService } from './services/shop-service.service';

@Component({
  selector: 'app-container',
  template: `
  <app-sign-form-container></app-sign-form-container>
<app-login></app-login>
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: []
})
export class ContainerComponent {

  constructor(public shopListService: ShopListService) { }
  ngOnInit() {
    
  }



}
