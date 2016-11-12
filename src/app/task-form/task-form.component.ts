import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';

import { AbstractForm } from '../form/abstract-form';
import { Task } from '../task/task';
import { TaskService } from '../task/task.service';
import { User } from '../user/user';
import { Response } from '@angular/http';

@Component({
    selector: 'app-task-form',
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent extends AbstractForm implements OnInit {

    @Output() onSaved = new EventEmitter<Task>();
    @Output() onCanceled = new EventEmitter();

    @Input() user: User;
    @Input() task: Task;

    constructor(
        private formBuilder: FormBuilder,
        private taskService: TaskService
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

        this.saveTask(new Task(
            this.task.id,
            this.form.value.title,
            this.form.value.description,
            this.form.value.rate,
            null,
            null
        ));
    }

    cancel(): void {
        this.onCanceled.emit();
    }

    private saveTask(task: Task): void {
        this.taskService.saveTask(this.user, task)
            .do((task) => task.periods = this.task.periods)
            .finally(() => {
                this.onResponse();
            })
            .subscribe(
                (task: Task) => {
                    this.onSaved.emit(task);
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
