import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShopListService } from './services/shop-service.service';

@Component({
  selector: 'app-container',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: []
})
export class ContainerComponent {

  constructor(public shopListService: ShopListService) { }


}
