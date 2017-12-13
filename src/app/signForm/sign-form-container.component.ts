import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


class User {
  constructor(
    public name: string,
    public email: string,
    public password1: string,
    public password2: string
 
  ) { }
}
class Profile{
  constructor(
    public nickname: string
    ){}
}

@Component({
  selector: 'app-sign-form-container',
  templateUrl: './sign-form-container.component.html',
  styleUrls: ['./sign-form-container.component.css']
})
export class SignFormContainerComponent implements OnInit {

  selectedValue = null;
  user: User;
  userProfile: Profile;
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  modalRef3: BsModalRef;
  modalRef4: BsModalRef;
  template: TemplateRef<any>;
  appUrl: string = environment.apiUrl;

  // name: string;
  // email: string;
  // password1: string;
  // password2: string;


// 모달 메소드
  constructor(private modalService: BsModalService, public http: HttpClient) { }

  openModal(template: TemplateRef<any>) {
    // console.log(this.modalRef);
    // console.log(this.modalService);
    // console.log(this.template);
    // console.log(BsModalRef);

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

  // 회원가입 데이터 전달
  onSubmit(signform) {
    console.log('Send user to server: ', signform);
    const payload = { name: signform.value.name, email: signform.value.email, password1: signform.value.password1, password2: signform.value.password2 };
    this.http.post(`${this.appUrl}/accounts/signup/`, payload)
    
      .subscribe((res) => console.log(res));
  
    this.initUser();
    // userForm.reset();
  }

  ngOnInit() {
    this.initUser();
    this.initProfile();
    console.log(this.user);
    console.log('[appUrl]', this.appUrl);
  }

  initUser() {
    this.user = new User('', '', '', '');
  }
  initProfile() {
    this.userProfile = new Profile('');
  }

}