import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input';

import { TaskModel } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

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
    @Output() onSaved = new EventEmitter();

    constructor(
        private taskService: TaskService
    ) {

    }

    ngOnInit() {
        this.task = new TaskModel();
    }

    save() {
        this.taskService.save(this.task)
            .subscribe((task: TaskModel) => {
                this.onSaved.emit(task);
            });
    }

    cancel() {

    }
}
