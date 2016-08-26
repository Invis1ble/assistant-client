import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { isPresent } from '@angular/forms/src/facade/lang';

export class AppValidators {
    /**
     * @todo implement reverse validation
     */
    static equalTo(name: string): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            if (
                isPresent(Validators.required(control)) ||
                !(control.root instanceof FormGroup) || // avoid the bug(?)
                control.root.controls[name].value === control.value
            ) {
                return null;
            }

            return {
                equalTo: true
            };
        };
    }
}
