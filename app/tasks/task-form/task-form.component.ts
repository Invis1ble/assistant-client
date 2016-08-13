import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class TaskFormComponent {
    error: string;
    form: FormGroup;
    @Output() onSaved = new EventEmitter();
    @Output() onCanceled = new EventEmitter();
    pending = false;
    task = new TaskModel();
    @Input() user: UserModel;

    constructor(
        private taskService: TaskService,
        private formBuilder: FormBuilder
    ) {
        this.form = formBuilder.group({
            title: [this.task.title, Validators.required],
            description: [this.task.description],
            rate: [this.task.rate, Validators.required]
        });
    }

    cancel() {
        this.onCanceled.emit(null);
    }

    saveTask(task: TaskModel) {
        this.taskService.saveTask(task, this.user.tasks.getSelfUrl())
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
