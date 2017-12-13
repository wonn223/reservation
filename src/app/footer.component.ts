import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div class="footer">주소 문의사항 등등</div>
  `,
  styles: [`
  .footer{
      background: black;
      color: white;
      height: 50px;
    }`]
})
export class FooterComponent  {


}
