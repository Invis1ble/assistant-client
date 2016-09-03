import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'app-form-error',
    templateUrl: 'app-form-error.component.html',
    styleUrls: ['app-form-error.component.css'],
    inputs: ['form']
})
export class AppFormErrorComponent {
    form: FormGroup;
}