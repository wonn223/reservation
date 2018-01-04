import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHandler } from '@angular/common/http/src/backend';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Source } from '../models/eventEmitter';
import { Router } from '@angular/router';



interface ReservationLists {
  shopName: string;
  party: number;
  resDate: string;
  resTime: string;
  shopAddress: string;
  shopTel: string;
}

interface FavoriteLists {
  pk: number;
  name: string;
  thumbnail: string;
}




@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {
  appUrl = environment.apiUrl;
  resList: any;
  favoriteList: FavoriteLists[];
  tokenInfo: string;
  mypk: string;
  myNickname = '';
  resultNickname: string;
  // 이미지처리
  form: FormGroup;
  loading = false;
  imageSrc = '../../assets/man.png';

  result; // file upload 수행 이후 서버로부터 수신한 데이터
  modalRef: BsModalRef;

  @Output() open: EventEmitter<Source> = new EventEmitter();


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  WithdrawalModal(templateWithdrawal: TemplateRef<any>){
    this.modalRef = this.modalService.show(templateWithdrawal);
    
  }
  Withdrawal(){
    this.auth.Withdrawal()
      .subscribe(
      () => {
        this.open.emit({ bool: false, token: this.auth.token });
        alert('다시 만날때 까지 맛있는거 많이 드시고 행복하세요');
        // this.auth.signout();
        this.router.navigate(['main']);
      },
      () => {
        
        console.log('completed');
      });
    this.modalRef.hide()
  }

  // 발급된 토큰을 생성함
  makeTokenInfo(){
    this.tokenInfo = this.auth.getToken();
    this.mypk = this.auth.getUserPk();
    console.log(this.mypk)
  }

  onFileChange(files: FileList) {
    if (files && files.length > 0) {
      // For Preview
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      this.avatar.setValue(file.name);
    }
  }

  onSubmit(files: FileList) {
    const headers = {
      // 'WWW-Authenticate' : 'Token',
      'Authorization': `Token ${this.tokenInfo}`
    };
    const options = {
      headers: new HttpHeaders(headers)
    };

    const formData = new FormData();
   
    formData.append('avatar', files[0]);

    const payload = {
      profile_image: files[0]
    }
  

    this.loading = true;
  
    // // 폼데이터를 서버로 전송한다.
    this.http.patch(`${this.appUrl}/accounts/${this.mypk}/profile/`, payload, options)
      .subscribe(res => console.log(res))
    //   .subscribe(res => {
    //     this.result = res;
    //     this.loading = false;
    //     this.avatar.setValue(null);
    //   });
  }

  get avatar() {
    return this.form.get('avatar');
  }

  // 닉네임변경
  changeNickname(name){
    const headers = {
      // 'WWW-Authenticate' : 'Token',
      'Authorization': `Token ${this.tokenInfo}`
    };
    const options = {
      headers: new HttpHeaders(headers)
    };
    const payload = {
      nickname : name
    }

    this.http.patch(`${this.appUrl}/accounts/${this.mypk}/profile/`, payload, options)
      .subscribe((res : any) => {
        console.log(res)
        this.resultNickname = res.nickname;
      })
    this.modalRef.hide()
  }

  // 회원의 예약리스트가져오기
  myReservation() {
    const headers = {
      // 'WWW-Authenticate' : 'Token',
      'Authorization': `Token ${this.tokenInfo}`
    };
    const options = {
      headers: new HttpHeaders(headers)
    };
    this.http.get(`${this.appUrl}/reservations/customer/`, options)
      .subscribe((reservationList: ReservationLists[]) => {
        console.log(reservationList);
        this.resList = reservationList.map((list: any) => Object.assign({},
          {
            shopName: list.restaurant.name,
            party: list.party,
            resDate: list.information.date,
            resTime: list.information.time,
            shopAddress: list.restaurant.address
          }));
          console.log(this.resList);
      });
  }

  // 즐겨찾기 리스트 가져오기
  setFavorite() {
    const headers = {
      // 'WWW-Authenticate' : 'Token',
      'Authorization': `Token ${this.tokenInfo}`
    };
    const options = {
      headers: new HttpHeaders(headers)
    };
    this.http.get(`${this.appUrl}/reservations/favorite-toggle/`, options)
      .subscribe((favorite) => {
        this.favoriteList = favorite[0].favorites;
        // favoritelist에 index가 잡혀있음
        // console.log(favorite.favorites)
        // this.favoriteList = favorite.map((list: any) => Object.assign({},
        //   {
        //     // shopPk: favorite.favorites.pk
        //     // shopName: string
        //     // shopImage: string

        //   }))

        console.log(this.favoriteList);
      });
  }
  removeFavorite(itemPk) {
    console.log(itemPk);
    const payload = { };

    const headers = {
      // 'WWW-Authenticate' : 'Token',
      'Authorization': `Token ${this.tokenInfo}`
    };
    const options = {
      headers: new HttpHeaders(headers)
    };

    this.http.post(`${this.appUrl}/reservations/${itemPk}/favorite-toggle/`, payload, options)
      .subscribe(() => this.setFavorite());
  }


  
  mypageObj: any;


  //회원정보 가져오기
  // setMyInfo(){
  //   const headers = {
  //     // 'WWW-Authenticate' : 'Token',
  //     'Authorization': 'Token be0c1c5b0929bb2937e9976e73524ab45d51609d'
  //   }
  //   const options = {
  //     headers: new HttpHeaders(headers)
  //   }
  //   //6에 로그인한 유저의 pk의값을 할당
  //   this.http.get(`${this.appUrl}/accounts/6/profile/`, options)
  //     .subscribe( (value:Profile) => {
  //       this.userInfo = value.user;
  //       console.log(this.userInfo);
  //       this.profile_image = value.profile_image;
  //       this.nickname = value.nickname;
  //       console.log(this.profile_image)
  //       })
  // }

  setMyInfo(){
    // XMLHttpRequest 객체의 생성
    var req = new XMLHttpRequest();
    // 동기식 처리
    const token = this.auth.getToken()
    req.open('GET', `${this.appUrl}/accounts/${this.mypk}/profile/`, false);
    req.setRequestHeader('Authorization', `Token ${this.tokenInfo}`);
    req.setRequestHeader('Content-type', 'application/json');
    // Request를 전송한다
    req.send();
    var obj = JSON.parse(req.response)
    this.mypageObj = obj
    console.log(this.mypageObj)
  }


  constructor(private router: Router, public http: HttpClient, public auth: AuthService, private fb: FormBuilder, private modalService: BsModalService) {
    this.form = this.fb.group({
      avatar: ['', Validators.required]
    }); 
    this.makeTokenInfo() }

  ngOnInit() {
    this.myReservation()
    this.setFavorite()
    this.setMyInfo()
    
  }

}
