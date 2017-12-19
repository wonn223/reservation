import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHandler } from '@angular/common/http/src/backend';

interface Infomation {
  name: string
  party: number
  price: number
  phone_number: string

}
interface myShopInfo {
  pk: number
  name: string
  address: string
  thumbnail: string
}

@Component({
  selector: 'app-managepage',
  templateUrl: './managepage.component.html',
  styleUrls: ['./managepage.component.css']
})
export class ManagepageComponent implements OnInit {

  appUrl = environment.apiUrl;
  reservationInfomations: Infomation[]
  myShopInfo: any
  

  setManagePage(shopPk: number) {
    console.log(this.appUrl)
    this.http.get(`${this.appUrl}/reservations/${shopPk}/restaurant/`)
      .subscribe(resInfo => console.log(resInfo))
  }

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.setManagePage(1)
  }

}
