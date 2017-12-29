import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="footer col-md-12">@JinJi</div>
  `,
  styles: [`
  .footer{
      background: #333541;
      color: white;
      position: absolute;
      bottom: 0;
      height: 50px;
      text-align: center;
      padding-top: 10px;
    }`]
})
export class FooterComponent  {


}
