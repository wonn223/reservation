import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="footer col-md-12">@JinJi</div>
  `,
  styles: [`

  *{
    position: fixed;
    bottom: 0;
  }

  .footer{
      background: #333541;
      color: white;
      height: 50px;
      text-align: center;
      padding-top: 10px;
    }`]
})
export class FooterComponent  {


}
