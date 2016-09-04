import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'app-form-error',
    templateUrl: 'app-form-error.component.html',
    styleUrls: ['app-form-error.component.css']
})
export class AppFormErrorComponent {
    @Input() form: FormGroup;
}