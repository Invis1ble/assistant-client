import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';

import { TaskModel } from '../shared/task.model';
import { TaskService } from '../shared/task.service';
import { UserModel } from '../../users/shared/user.model';

@Component({
    selector: 'assistant-task-form',
    templateUrl: 'app/tasks/task-form/task-form.component.html',
    styleUrls: [
        'app/tasks/task-form/task-form.component.css'
    ],
    directives: [
        MD_INPUT_DIRECTIVES
    ]
})
export class TaskFormComponent implements OnInit {
    task: TaskModel;
    @Input() user: UserModel;
    @Output() onSaved = new EventEmitter();
    @Output() onCanceled = new EventEmitter();

    constructor(
        private taskService: TaskService
    ) {

    }

    ngOnInit() {
        this.task = new TaskModel();
    }

    save() {
        this.taskService.saveTask(this.task, this.user.tasks.getSelfUrl())
            .subscribe((task: TaskModel) => {
                this.onSaved.emit(task);
            });
    }

    cancel() {
        this.onCanceled.emit(null);
    }
}
