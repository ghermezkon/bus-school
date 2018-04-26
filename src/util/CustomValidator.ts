import { FormControl, FormGroup } from "@angular/forms";
import * as _ from 'lodash';

export class CustomeValidator {
    static isMobile(control: FormControl): any {
        if (control.value !== '' && control.value.length === 11) {
            if (control.value.substring(0, 2) !== '09') return ({ isMobile: true });
            else {
                const count = (str, ch) => _.sumBy(str, x => x === ch);
                if (count(control.value, '1') == 9) return ({ isMobile: true });
                else if (count(control.value, '2') == 9) return ({ isMobile: true });
                else if (count(control.value, '3') == 9) return ({ isMobile: true });
                else if (count(control.value, '4') == 9) return ({ isMobile: true });
                else if (count(control.value, '5') == 9) return ({ isMobile: true });
                else if (count(control.value, '6') == 9) return ({ isMobile: true });
                else if (count(control.value, '7') == 9) return ({ isMobile: true });
                else if (count(control.value, '8') == 9) return ({ isMobile: true });
                else if (count(control.value, '9') == 10) return ({ isMobile: true });
                else return null;
            }
        }
    }
    //------------------------------------------------------------------------------
    static MatchPassword(ac: FormGroup) {
        let password = ac.get('password').value;
        let confirmPassword = ac.get('confirmPassword').value;
        if (password !== '' && confirmPassword !== '') {
            if (password != confirmPassword) {
                ac.get('confirmPassword').setErrors({ MatchPassword: true });
            } else {
                return null;
            }
        }
    }
}