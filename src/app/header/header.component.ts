import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../services/auth.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Validators } from '@angular/forms';


class User {
  constructor(
    public userid: string,
    public username: string,
    public password: string,
    public password2: string
  ) { }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  loginComp: TemplateRef<any>;
  isActivated = false;
  template: TemplateRef<any>;

  addClass () {
    console.log('addClass');
    this.isActivated = !this.isActivated;
  }

  constructor(private modalService: BsModalService, public auth: AuthService ) { }

  openModal(loginComp: TemplateRef<any>) {
    this.auth.templateRef = loginComp;
    this.modalRef = this.modalService.show(loginComp, { class : 'modal-con'});
    this.auth.headerModalRef = this.modalRef;
    console.log(this.auth.templateRef);
    console.log(this.auth.headerModalRef);

  }
  openModal2(loginComp: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(loginComp, { class: 'second' });
  }
  openModal3(loginComp: TemplateRef<any>) {
    this.modalRef3 = this.modalService.show(loginComp);
  }

  closeModal(loginComp: TemplateRef<any>) {
    this.modalRef.hide();
    this.modalRef = null;
  }

  ngOnInit() {
    this.initUser();
  }

  initUser() {
    this.user = new User('', '', ' ', ' ');
  }

}
