import { AbstractControl, FormGroup } from '@angular/forms';

import { FormErrors } from './form-errors';
import { isPresent } from './facade/lang';

export abstract class AbstractFormComponent {
    protected form: FormGroup;
    protected pending: boolean = false;
    protected submitted: boolean = false;

    protected beforeRequest(): void {
        this.lockForm();
        this.setSubmitted();
    }

    protected isDisabled(control: AbstractControl): boolean {
        return this.pending || (control.root === control &&
            Object.values(this.form.controls).some((control: AbstractControl): boolean => control.invalid ));
    }

    protected isSubmitted(): boolean {
        return this.submitted;
    }

    protected lockForm(): void {
        this.pending = true;
    }

    protected onResponse(): void {
        this.unlockForm();
    }

    protected onSubmit(): void {
        this.beforeRequest();
    }

    protected setErrors(control: AbstractControl, errors: FormErrors): void {
        if (isPresent(errors.errors)) {
            let controlErrors = {};

            errors.errors.forEach((error) => {
                controlErrors[error] = true;
            });

            control.setErrors(controlErrors);
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

    protected setFormErrors(errors: FormErrors): void {
        this.setErrors(this.form, errors);
    }

    protected setSubmitted(): void {
        this.submitted = true;
    }

    protected unlockForm(): void {
        this.pending = false;
    }
}