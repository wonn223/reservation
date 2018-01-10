import { AbstractControl } from '@angular/forms';

export class PasswordValidator {

    static match(form: AbstractControl) {
        // 매개변수로 전달받은 검증 대상 폼 모델에서 password와 confirmPassword을 취득
        const old_password = form.get('old_password').value;
        const new_password = form.get('new_password').value;
        const new_password_confirm = form.get('new_password_confirm').value;

        // password와 confirmPassword의 값을 비교한다.
        if (new_password !== new_password_confirm) {
            return { match: { new_password, new_password_confirm } };
        } else {
            return null;
        }
    }
}