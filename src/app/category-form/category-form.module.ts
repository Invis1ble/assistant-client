import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
    MdProgressCircleModule
} from '@angular/material';

import { FormModule } from '../form/form.module';
import { CategoryFormComponent } from './category-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormModule,
        MdButtonModule,
        MdDialogModule,
        MdInputModule,
        MdProgressCircleModule
    ],
    entryComponents: [
        CategoryFormComponent
    ],
    declarations: [
        CategoryFormComponent
    ]
})
export class CategoryFormModule {



}
