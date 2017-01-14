import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Response } from '@angular/http';

import { CustomValidators } from 'ng2-validation';
import { MdDialogRef } from '@angular/material';
import 'rxjs/add/operator/do';

import { AbstractForm } from '../form/abstract-form';
import { CategoryCollection } from '../category/category.collection';
import { CategoryModel } from '../category/category.model';
import { TaskModel } from '../task/task.model';
import { TaskService } from '../task/task.service';
import { isPresent } from '../facade/lang';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent extends AbstractForm implements OnInit {

    @Input() categories: CategoryCollection;
    @Input() category: CategoryModel;
    @Input() task: TaskModel;

    constructor(
        private formBuilder: FormBuilder,
        private taskService: TaskService,
        private dialogRef: MdDialogRef<TaskFormComponent>
    ) {
        super();
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            category: [this.category.id, Validators.required],
            title: [this.task.title, Validators.required],
            description: [this.task.description],
            rate: [this.task.rate, [
                Validators.required,
                CustomValidators.number,
                CustomValidators.min(5)
            ]]
        });
    }

    onSubmit(): void {
        super.onSubmit();

        const task = new TaskModel(
            this.task.id,
            this.form.value.title,
            this.form.value.description,
            this.form.value.rate,
            null,
            null,
            null
        );

        if (isPresent(this.form.value.category)) {
            task.categoryId = this.form.value.category;
        }

        this.saveTask(task);
    }

    private saveTask(task: TaskModel): void {
        this.taskService.saveTask(this.category, task)
            .do((task) => task.periods = this.task.periods)
            .subscribe(
                (task: TaskModel) => {
                    this.dialogRef.close(task);
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
