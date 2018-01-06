import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
   <div>
  <h1>404</h1>
  <h2>Page Not Found</h2>

  <p>Sorry, I couldn't find the page you were looking for.</p>

  <button routerLink='/step' style="width: auto; margin: 10px auto;">검색화면으로 돌아가기</button>

  <p>Try going <a href="#">back to where you came from</a>, <a href="../">up a directory</a>, or to the <a href="/">home page</a>.</p>
</div>`,
  styles: [`
  div {
  background: lightgray;
  padding: 20px;  
  height: 100vh;
  text-align: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
	text-shadow: 0 2px 1px hsla(0,0%,100%,.2);
}

h1 {
	font-size: 2.5em;
	margin-bottom: 0.2em;
}

p {
  	padding-bottom: 3px;
}

a {
	text-decoration: none;
	border-bottom: 1px solid currentColor;
}

a:hover {
  color: indigo;
}

  `]
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
