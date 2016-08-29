import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';

import { FormErrors } from './form-errors';

export abstract class AbstractFormComponent implements OnInit {
    protected errors: FormErrors;
    protected form: FormGroup;
    protected pending: boolean = false;

    public ngOnInit(): void {
        this.errors = {};
    }

    protected beforeRequest(): void {
        this.resetErrors();
        this.lockForm();
    }

    protected getControlError(controlName: string, errorCode: string): string {
        return this.form.controls[controlName].getError(errorCode);
    }

    protected getControlErrors(controlName: string): Array<Object> | null {
        return this.getFieldErrors(this.errors, controlName);
    }

    protected getFieldErrors(errors: FormErrors, path: string): Array<Object> | null {
        if (undefined === errors.children) {
            return null;
        }

        let segmentEnd = path.indexOf('[');

        if (segmentEnd !== -1) {
            let segment = path.substr(0, segmentEnd);

            if (undefined === errors.children[segment]) {
                return null;
            }

            return this.getFieldErrors(errors.children[segment], path.replace(/^\w+\[(\w*)]/, '$1'));
        }

        if (undefined === errors.children[path] || undefined === errors.children[path].errors) {
            return null;
        }

        return errors.children[path].errors;
    }

    protected hasControlError(controlName: string, errorCode: string): boolean {
        return this.form.controls[controlName].hasError(errorCode);
    }

    protected isControlValid(controlName: string): boolean {
        if (this.form.controls[controlName].valid || this.form.controls[controlName].pristine) {
            let errors = this.getControlErrors(controlName);

            return errors === null || errors.length === 0;
        }

        return false;
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

    protected resetErrors(): void {
        this.setErrors({});
    }

    protected setErrors(errors: FormErrors): void {
        this.errors = errors;
    }

    protected unlockForm(): void {
        this.pending = false;
    }
}