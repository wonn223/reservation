import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PasswordValidator } from './password-validator'



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
  signupForm: FormGroup;
  selectedValue = null;
  // user: User;
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
  onSignup() {
    console.log('Send user to server: ', this.signupForm.value);
    let signvalue = this.signupForm.value;
    console.log(signvalue);
    let payload = { name: signvalue.name, email:signvalue.email, password1:signvalue.passwordGroup.password1, password2:signvalue.passwordGroup.password2 };
    console.log(payload);
    this.http.post(`${this.appUrl}/accounts/signup/`, payload)
    
      .subscribe((res) => console.log(res));
  
    this.signupForm.reset();
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.pattern('^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$')
      ]),
      passwordGroup: new FormGroup({
        password1: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9]{4,10}')]),
        password2: new FormControl('', Validators.required)
      }, PasswordValidator.match)
    });
    console.log(this.signupForm);
    
    console.log('[appUrl]', this.appUrl);
  }
  get name() {
    return this.signupForm.get('name');
  }
  get email() {
    return this.signupForm.get('email');
  }

  get passwordGroup() {
    return this.signupForm.get('passwordGroup');
  }

  get password1() {
    return this.signupForm.get('passwordGroup.password1');
  }

  get password2() {
    return this.signupForm.get('passwordGroup.password2');
  }



}