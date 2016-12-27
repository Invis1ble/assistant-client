import { AbstractControl, FormGroup } from '@angular/forms';

import { FormErrors } from './form-error/form-errors';
import { isPresent } from '../facade/lang';

export abstract class AbstractForm {

    protected form: FormGroup;

    get submitDisabled(): boolean {
        return this.form.disabled || this.form.invalid || this.form.pending;
    }

    onSubmit(): void {
        this.form.markAsPending();
    }

    protected setFormErrors(errors: FormErrors): void {
        this.setErrors(this.form, errors);
    }

    protected setErrors(control: AbstractControl, errors: FormErrors): void {
        if (isPresent(errors.errors)) {
            let controlErrors = {};

            errors.errors.forEach((error) => {
                controlErrors[error] = true;
            });

            control.setErrors(controlErrors);
            control.markAsDirty({
                onlySelf: true
            });
        }

        if (isPresent(errors.children)) {
            for (let name in errors.children) {
                if (errors.children.hasOwnProperty(name)) {
                    let child = control.get(name);

                    if (null !== child) {
                        this.setErrors(child, errors.children[name]);
                    }
                }
            }
        }
    }

}