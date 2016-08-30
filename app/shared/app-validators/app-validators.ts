import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { isPresent } from '@angular/forms/src/facade/lang';
import { EqualToValidator } from './directives/equal-to';

export class AppValidators {
    /**
     * @todo implement reverse validation
     */
    static equalTo(targetPath: string): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            let target = control.root.get(targetPath);

            if (!target || isPresent(Validators.required(control)) || target.value === control.value) {
                return null;
            }

            return {
                equalTo: true
            };
        };
    }
}

export const APP_VALIDATORS_DIRECTIVES = [
    EqualToValidator
];
