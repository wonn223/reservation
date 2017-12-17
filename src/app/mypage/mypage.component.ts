import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHandler } from '@angular/common/http/src/backend';


interface ReservationLists {
  shopName: string
  party: number
  resDate: string
  resTime: string
  shopAddress: string
  shopTel: string
 
}

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {
  appUrl = environment.apiUrl;
  resList: any

  // 회원의 예약리스트가져오기
  myReservation(){
    const headers = {
      // 'WWW-Authenticate' : 'Token',
      'Authorization': 'Token be0c1c5b0929bb2937e9976e73524ab45d51609d'
    }
    const options = {
      headers: new HttpHeaders(headers)
    }
    this.http.get<ReservationLists[]>(`${this.appUrl}/reservations/customer/`, options)
      .subscribe(reservationList => {
        console.log(reservationList)
        this.resList = reservationList.map(list => Object.assign({},
          {
            shopName: list.restaurant.name,
            party: list.party,
            resDate: list.information.date,
            resTime: list.information.time,
            shopAddress: list.restaurant.address
          }))
          console.log(this.resList)
      })  
  }

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.myReservation()
  }

}
