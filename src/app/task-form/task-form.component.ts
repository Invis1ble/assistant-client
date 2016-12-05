import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Response } from '@angular/http';

import { MdDialogRef } from '@angular/material';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';

import { AbstractForm } from '../form/abstract-form';
import { TaskModel } from '../task/task.model';
import { TaskService } from '../task/task.service';
import { UserModel } from '../user/user.model';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent extends AbstractForm implements OnInit {

    @Input() user: UserModel;
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
            title: [this.task.title, Validators.required],
            description: [this.task.description],
            rate: [this.task.rate, Validators.required]
        });
    }

    onSubmit(): void {
        super.onSubmit();

        this.saveTask(new TaskModel(
            this.task.id,
            this.form.value.title,
            this.form.value.description,
            this.form.value.rate,
            null,
            null
        ));
    }

    cancel(): void {
        this.dialogRef.close();
    }

    private saveTask(task: TaskModel): void {
        this.taskService.saveTask(this.user, task)
            .do((task) => task.periods = this.task.periods)
            .finally(() => {
                this.onResponse();
            })
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
