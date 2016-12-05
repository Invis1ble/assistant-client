import { Component, Input, HostBinding, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = (): void => {};

const FORM_GROUP_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormGroupComponent),
    multi: true
};

@Component({
    selector: 'app-form-group',
    templateUrl: './form-group.component.html',
    styleUrls: ['./form-group.component.scss'],
    providers: [
        FORM_GROUP_CONTROL_VALUE_ACCESSOR
    ]
})
export class FormGroupComponent implements ControlValueAccessor {

    @Input() control: AbstractControl;
    @Input() pending: boolean = false;
    @Input() submitted: boolean = false;

    /**
     * Aria related inputs.
     */
    @Input('aria-label') ariaLabel: string;
    @Input('aria-labelledby') ariaLabelledBy: string;
    @Input('aria-disabled') ariaDisabled: boolean;
    @Input('aria-required') ariaRequired: boolean;
    @Input('aria-invalid') ariaInvalid: boolean;

    /**
     * Bindings.
     */
    @Input() align: 'start' | 'end' = 'start';
    @Input() dividerColor: 'primary' | 'accent' | 'warn' = 'primary';
    @Input() floatingPlaceholder: boolean = true;
    @Input() hintLabel: string = '';

    @Input() autocomplete: string;
    @Input() autocorrect: string;
    @Input() autocapitalize: string;
    @Input() autofocus: boolean = false;
    @Input() disabled: boolean = false;
    @Input() id: string = null;
    @Input() list: string = null;
    @Input() max: string | number = null;
    @Input() maxlength: number = null;
    @Input() min: string | number = null;
    @Input() minlength: number = null;
    @Input() placeholder: string = null;
    @Input() readonly: boolean = false;
    @Input() required: boolean = false;
    @Input() spellcheck: boolean = false;
    @Input() step: number = null;
    @Input() tabindex: number = null;
    @Input() type: string = 'text';
    @Input() name: string = null;

    // textarea-specific
    @Input() rows: number = null;
    @Input() cols: number = null;
    @Input() wrap: 'soft' | 'hard' = null;

    @Input() set value(value: any) {
        if (value !== this.encapsulatedValue) {
            this.encapsulatedValue = value;
            this.onChangeCallback(value);
        }
    }

    private encapsulatedValue: any = '';
    private onChangeCallback: (value: any) => void = noop;

    @HostBinding('class.has-error') get hasError(): boolean {
        return !this.control.valid && (this.submitted || !this.control.pristine);
    }

    get value(): any {
        return this.encapsulatedValue;
    };

    writeValue(value: any): void {
        this.encapsulatedValue = value;
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {

    }

}