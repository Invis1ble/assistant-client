import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import 'rxjs/add/operator/finally';

import { AbstractFormComponent } from '../../shared/abstract-form.component';
import { TaskModel } from '../shared/task.model';
import { TaskService } from '../shared/task.service';
import { UserModel } from '../../users/shared/user.model';

@Component({
    selector: 'assistant-task-form',
    templateUrl: 'app/tasks/task-form/task-form.component.html',
    styleUrls: [
        'app/tasks/task-form/task-form.component.css'
    ]
})
export class TaskFormComponent extends AbstractFormComponent implements OnInit {
    @Output() onSaved = new EventEmitter<TaskModel>();
    @Output() onCanceled = new EventEmitter();
    @Input() private task: TaskModel;
    @Input() private user: UserModel;

    constructor(
        private taskService: TaskService,
        private formBuilder: FormBuilder
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();

        this.form = this.formBuilder.group({
            title: [this.task.title, Validators.required],
            description: [this.task.description],
            rate: [this.task.rate, Validators.required]
        });
    }

    protected cancel() {
        this.onCanceled.emit();
    }

    protected onSubmit() {
        super.onSubmit();

        let task = new TaskModel();

        task.id = this.task.id;
        task.title = this.form.value.title;
        task.description = this.form.value.description;
        task.rate = this.form.value.rate;

        this.saveTask(task);
    }

    protected saveTask(task: TaskModel) {
        let url;

        if (task.id) {
            url = this.user.tasks.getUrl(task);
        } else {
            url = this.user.tasks.getUrl();
        }

        this.taskService.saveTask(task, url)
            .finally(() => {
                this.onResponse();
            })
            .subscribe(
                (task: TaskModel) => {
                    this.onSaved.emit(task);
                },
                (response: Response) => {
                    if (undefined === this.errors.errors) {
                        this.errors.errors = [];
                    }

                    switch (response.status) {
                        case 400:
                            this.setErrors(response.json().errors);
                            return;

                        default:
                            this.errors.errors.push(`${response.statusText ? response.statusText : 'Unknown Error'}.`);
                    }
                }
            );
    }
}
