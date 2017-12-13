import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
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
  selector: 'app-login',
  templateUrl: './sign-form-container.component.html',
  styleUrls: ['./sign-form-container.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  template: TemplateRef<any>;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class : 'modal-con'});
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, { class: 'second' });
    this.modalRef.hide();
    this.modalRef = null;
  }

  ngOnInit() {
    this.initUser();
  }

  initUser() {
    this.user = new User('', '','','');
  }

}
