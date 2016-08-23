import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import 'rxjs/add/operator/finally';

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
export class TaskFormComponent implements OnInit {
    error: string;
    form: FormGroup;
    @Output() onSaved = new EventEmitter<TaskModel>();
    @Output() onCanceled = new EventEmitter();
    pending = false;
    @Input() task: TaskModel;
    @Input() user: UserModel;

    constructor(
        private taskService: TaskService,
        private formBuilder: FormBuilder
    ) {

    }

    cancel() {
        this.onCanceled.emit();
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            title: [this.task.title, Validators.required],
            description: [this.task.description],
            rate: [this.task.rate, Validators.required]
        });
    }

    saveTask(task: TaskModel) {
        let url;

        task.id = this.task.id;

        if (task.id) {
            url = this.user.tasks.getUrl(task);
        } else {
            url = this.user.tasks.getUrl();
        }

        this.taskService.saveTask(task, url)
            .finally(() => this.pending = false)
            .subscribe(
                (task: TaskModel) => {
                    this.onSaved.emit(task);
                },
                (error: any) => {
                    this.error = `${error.statusText}.`;
                }
            );
    }

    onSubmit() {
        this.error = null;
        this.pending = true;
        this.saveTask(this.form.value);
    }
}
