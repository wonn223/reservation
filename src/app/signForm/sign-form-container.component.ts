import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


class User {
  constructor(
    public userid: string,
    public username: string,
    public password: string,
    public password2: string
 
  ) { }
}

// interface User {
//   userid: string,
//   username: string,
//   password: string,
//   password2: string,
// }
@Component({
  selector: 'app-signFrom',
  templateUrl: './sign-form-container.component.html',
  styleUrls: ['./sign-form-container.component.css']
})
export class SignFormComponent implements OnInit {
  places = [
    { id: 1, name: "강남구" },
    { id: 2, name: "서초구" },
    { id: 3, name: "용산구" },
    { id: 4, name: "마포구" },
    { id: 5, name: "성북구" }
  ];
  selectedValue = null;
  user: User;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  modalRef4: BsModalRef;
  template: TemplateRef<any>;
  url = 'http://localhost:3000/user';
 


// 모달 메소드
  constructor(private modalService: BsModalService, public http: HttpClient) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModal2(template: TemplateRef<any>) {
    this.modalRef2 = this.modalService.show(template, { class: 'second' });
    this.modalRef.hide();
    this.modalRef = null;
  }
  openModal3(template: TemplateRef<any>) {
    this.modalRef3 = this.modalService.show(template, { class: 'third' });
    this.modalRef2.hide();
    this.modalRef2 = null;
  }
  openModal4(template: TemplateRef<any>) {
    this.modalRef4 = this.modalService.show(template, { class: 'fourth' });
    this.modalRef3.hide();
    this.modalRef3 = null;
  }
  // add(templateNested) {
  //   console.log(templateNested);
  //   const payload = { userid: this.user.userid, username: this.user.username, password: this.user.password, password2: this.user.password2 }
  //   this.http.post(this.url, payload)
  //     .subscribe(() => this.openModal2(this.template));
  // }
  onSubmit(signForm) {
    console.log('Send user to server: ', this.user);
    
    this.initUser();
    // userForm.reset();
  }

  ngOnInit() {
    this.initUser();
  }
  initUser() {
    this.user = new User('', '','','');
  }

}
