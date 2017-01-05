import { AbstractControl } from '@angular/forms';
import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-form-control-container',
    templateUrl: './form-control-container.component.html',
    styleUrls: ['./form-control-container.component.scss']
})
export class FormControlContainerComponent {

    @Input() control: AbstractControl;

    @HostBinding('class.has-error') get hasError(): boolean {
        return this.control.invalid && this.control.dirty;
    }

}
