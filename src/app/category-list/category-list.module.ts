import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    MdButtonModule,
    MdIconModule,
    MdProgressCircleModule
} from '@angular/material';

import { CategoryFormModule } from '../category-form/category-form.module';
import { CategoryListComponent } from './category-list.component';
import { CategoryModule } from '../category/category.module';

@NgModule({
    imports: [
        CommonModule,
        CategoryFormModule,
        CategoryModule,
        MdButtonModule,
        MdIconModule,
        MdProgressCircleModule
    ],
    declarations: [
        CategoryListComponent
    ]
})
export class CategoryListModule {



}
