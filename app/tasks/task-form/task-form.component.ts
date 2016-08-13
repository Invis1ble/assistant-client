import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, REACTIVE_FORM_DIRECTIVES, Validators } from '@angular/forms';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_PROGRESS_CIRCLE_DIRECTIVES } from '@angular2-material/progress-circle';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import { TaskModel } from '../shared/task.model';
import { TaskService } from '../shared/task.service';
import { UserModel } from '../../users/shared/user.model';

@Component({
    selector: 'assistant-task-form',
    templateUrl: 'app/tasks/task-form/task-form.component.html',
    styleUrls: [
        'app/tasks/task-form/task-form.component.css'
    ],
    providers: [
        MdIconRegistry
    ],
    directives: [
        MD_BUTTON_DIRECTIVES,
        MD_INPUT_DIRECTIVES,
        MD_PROGRESS_CIRCLE_DIRECTIVES,
        MdIcon,
        REACTIVE_FORM_DIRECTIVES
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
            .subscribe(
                (task: TaskModel) => {
                    this.onSaved.emit(task);
                    this.pending = false;
                },
                (error: any) => {
                    this.pending = false;
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
