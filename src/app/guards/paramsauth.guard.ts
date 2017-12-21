// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// import { ShopListService } from '../services/shop-service.service';
// import { ActivatedRoute } from '@angular/router/src/router_state';
// import { setTimeout } from 'timers';

// @Injectable()
// export class ParamsauthGuard implements CanActivate {
//   a: any;
//   constructor( private router: Router, private shop: ShopListService, public routes: ActivatedRoute) {}

//   canActivate() {

//     this.a = this.routes.data['pk'];
//     if ( !(this.shop.resPK === this.shop.shopParmsPk) ) {
//       console.log(this.shop.resPK);
//       console.log(this.shop.shopParmsPk);
//       alert('접근이 금지되었습니다');
//       return false;
//     } else {
//       return true;
//     }
//   }

// }
