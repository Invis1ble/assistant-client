import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'app-form-group',
    templateUrl: 'app-form-group.component.html',
    styleUrls: ['app-form-group.component.css'],
    inputs: [
        'control',
        'name',
        'type',
        'placeholder'
    ]
})
export class AppFormGroupComponent {
    control: AbstractControl;
    name: string;
    type?: string;
    placeholder?: string;

    pending: boolean;
}