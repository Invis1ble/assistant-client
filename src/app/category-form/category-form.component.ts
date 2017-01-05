import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Response } from '@angular/http';

import { CustomValidators } from 'ng2-validation';
import { MdDialogRef } from '@angular/material';

import { AbstractForm } from '../form/abstract-form';
import { CategoryModel } from '../category/category.model';
import { CategoryService } from '../category/category.service';
import { UserModel } from '../user/user.model';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends AbstractForm implements OnInit {

    @Input() user: UserModel;
    @Input() category: CategoryModel;

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private dialogRef: MdDialogRef<CategoryFormComponent>
    ) {
        super();
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: [this.category.name, Validators.required],
            description: [this.category.description],
            rate: [this.category.rate, [
                Validators.required,
                CustomValidators.number,
                CustomValidators.min(5)
            ]]
        });
    }

    onSubmit(): void {
        super.onSubmit();

        this.saveCategory(new CategoryModel(
            this.category.id,
            this.form.value.name,
            this.form.value.description,
            this.form.value.rate,
            null
        ));
    }

    private saveCategory(category: CategoryModel): void {
        this.categoryService.saveCategory(this.user, category)
            .do((category) => category.tasks = this.category.tasks)
            .subscribe(
                (category: CategoryModel) => {
                    this.dialogRef.close(category);
                },
                (response: Response) => {
                    let errors;

                    switch (response.status) {
                        case 400:
                            errors = response.json().errors;
                            break;

                        default:
                            errors = {
                                errors: [`${response.statusText ? response.statusText : 'Unknown Error'}.`]
                            };
                    }

                    this.setFormErrors(errors);
                }
            );
    }

}
