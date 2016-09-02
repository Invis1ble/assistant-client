import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input, OnChanges, SimpleChanges, forwardRef } from '@angular/core';

import { AppValidators } from '../app-validators';
import { isPresent } from '../../facade/lang';

export const EQUAL_TO_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => EqualToValidator),
    multi: true
};

@Directive({
    selector: '[equalto][formControlName], [equalto][formControl], [equalto][ngModel]',
    providers: [
        EQUAL_TO_VALIDATOR
    ],
    host: {
        '[attr.equalto]': 'equalto ? equalto : null'
    }
})
export class EqualToValidator implements Validator, OnChanges {
    private validator: ValidatorFn;
    private onChange: () => void;

    @Input() equalto: string;

    private createValidator(): void {
        this.validator = AppValidators.equalTo(this.equalto);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['equalto']) {
            this.createValidator();

            if (this.onChange) {
                this.onChange();
            }
        }
    }

    validate(control: AbstractControl): {[key: string]: any} {
        if (isPresent(this.equalto)) {
            return this.validator(control);
        }

        return null;
    }

    registerOnChange(fn: () => void): void {
        this.onChange = fn;
    }
}