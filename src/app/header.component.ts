import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  template: `
    <div class="row header">
        <div class="col-md-2">
          <div class="logo"></div>
           <div class="base"></div>
           <h3 class="name">진지한 밥상</h3>
        </div>
        <div class="col-md-5">
          <div class="title-wrapper">
          <div class="logo-wrapper">
            </div>
          </div>
          <fieldset class="main-search">
              <input type="text" id="mainsearch" placeholder="지역, 가게명 검색">
              <input type="button" class="button-search" value="검색">
          </fieldset>
        </div>
        <div class="col-md-5">
          <nav class="nav-menus">
            <a class="login-button">
             
            </a>
            <a>
            
            </a>
            <button class="login-icon">
              <figure class="user">
                <span class="badge"></span>
                <div class="thumb"></div>
              </figure>
            </button>
          </nav>
        </div>
      </div>
  `,
  styles: [`
 .row.header {
   width: 100%;
  background: black;

}

.title-wrapper {
	width: 100%;
	height: 100%;
}

.logo-wrapper {
	width: 100%;
	height: 100%;
	text-align: center;
	/* position: relative; */
}
  
.logo {
	position : absolute;
	width: 75px;
	height: 75px;
	background : url('../../assets/mainpage/waiter.png') no-repeat;  
	background-size: cover;
	margin-right: 2px;
  }

/* 로고 옆 이름  */
.name {
	position: absolute;
	top: 0;
	left: 33%;
	margin-left: 2px;
	width: 100px; 
	 padding:  0 0 5px; 
	font-family: 'Hanna';
	font-size: 2.1rem;
	color: #ffff;
  }

  .nav-menus {
	float: left;
  }
  /* > a까지 구체적으로. */
  .nav-menus > a {
	display: block;
	float: left; 
	margin: 10px 0;
	width: 150px;
	line-height: 60px; 
	color : white;
	/* background-color: gray; */
	text-align: center;
  }
  .login-button{
    background:transparent;
    border: 0;
  }

  .login-icon {
	height : 60px;
	width: 60px;
	line-height: 60px;
	margin-top: 10px;
	border-radius: 50px;
	background-color: transparent;
  }
  
  .login-icon .user .thumb {
	position: relative;
	height : 60px;
	width : 60px;
	right : 8px;
	bottom: 1px;
	margin-right: 10px;
	background-size: cover;
	background-image: url('https://secure.gravatar.com/avatar/ed340a9cb8162dfb315d4b9bbbc2334e?s=36&d=https://app.zeplin.io/img/emotars/emotarMonkeyFace.png' );
	/* background-color: aquamarine; */
	border-radius: 50px;
  }
    `]
})
export class HeaderComponent {


}
