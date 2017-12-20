import { AbstractControl } from '@angular/forms';

export class PasswordValidator {

    static match(form: AbstractControl) {
        // 매개변수로 전달받은 검증 대상 폼 모델에서 password와 confirmPassword을 취득
        const password1 = form.get('password1').value;
        const password2 = form.get('password2').value;

        // password와 confirmPassword의 값을 비교한다.
        if (password1 !== password2) {
            return { match: { password1, password2 } };
        } else {
            return null;
        }
    }
}