import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHandler } from '@angular/common/http/src/backend';
import { TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

interface myShopInfo {
  pk: number
  name: string
  address: string
  thumbnail: string
}

interface ReservationsInfo {
  buyer_name: string
  buyer_tel: string
  amount: number
  imp_uid: string
  status: string
  reservation: {
    name: string;
    party: number;
    price: number;
    phone_number: string;
    information: {
      pk: number;
      time: string;
      date: string;
    }
  }
}

@Component({
  selector: 'app-managepage',
  templateUrl: './managepage.component.html',
  styleUrls: ['./managepage.component.css']
})
export class ManagepageComponent implements OnInit {

  appUrl = environment.apiUrl;
  reservationInfomations: ReservationsInfo[]
  modalRef: BsModalRef;
  cancelComment= '';

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  onInput(event) {
    // event.target.value에는 사용자 입력 텍스트가 담겨있다.
    this.cancelComment = event.target.value;
  }
  
  paymentCancle(){
    this.modalRef.hide()

  }
  
  
  setManagePage(shopPk: number) {
    console.log(this.appUrl)
    this.http.get<ReservationsInfo>(`${this.appUrl}/reservations/${shopPk}/restaurant/`)
      .subscribe( (resInfo : any) => 
      {  console.log(resInfo)
        this.reservationInfomations = resInfo.map((list:any) => Object.assign({},
        {
          buyer_name : list.buyer_name,
          buyer_tel: list.buyer_tel,
          amount: list.amount,
          imp_uid: list.imp_uid,
          status: list.status,
          reservation: list.reservation
        }))
        console.log(this.reservationInfomations)
      })
  }

  constructor(public http: HttpClient, private modalService: BsModalService) { }

  ngOnInit() {
    this.setManagePage(1)
  }

}
