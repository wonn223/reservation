import { Injectable, NgZone } from '@angular/core';

declare const window: any;
declare const FB: any;

@Injectable()
export class FbloginserviceService {
  constructor(private zone: NgZone) {
    this.zone.run( () => {
      (function(d, s, id) {
        let js: HTMLScriptElement;
        let _js = d.getElementsByTagName(s)[0];
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        // document객체에 script 엘리먼트를 만든다.
        _js = d.createElement(s);
        // double assertion
        // Element타입 => HTMLScriptElement타입
        js = (<HTMLScriptElement> <any>_js);
        // <script id=""></script>
        js.id = id;
        js.src = `https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v2.11`;
        fjs.parentNode.insertBefore(js, fjs);
        console.log('자바스크립트 링크 완료');
        console.log(js);
        console.log(js.src);
      }(document, 'script', 'facebook-jssdk'));
    });

    window.fbasyncInit = () => {
      console.log('check');
      window.FB.init({
        appId            : '232105043996115',
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v2.11'
      });

    window.FB.AppEvents.logPageView();
    console.log('check2');
    };

    if (window.FB) {
      window.FB.XFBML.parse();
    }

  }

}
