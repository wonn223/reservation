import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="footer col-md-12">@JinJi</div>
  `,
  styles: [`

  *{
    position: static;
    bottom: 0;
    height: 35px;
  }

  .footer{
      background: #333541;
      color: white;
      text-align: center;
      padding-top: 10px;
    }`]
})
export class FooterComponent  {


}
