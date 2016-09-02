import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

import { EqualToValidator } from './directives/equal-to';
import { isPresent } from '../facade/lang';

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
