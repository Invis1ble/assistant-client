import { Component, OnInit } from '@angular/core';

import { TaskService } from '../shared/task.service';
import { TaskModel } from '../shared/task.model';

@Component({
    selector: 'assistant-task-form',
    templateUrl: 'app/tasks/task-form/task-form.component.html',
    styleUrls: [
        'app/tasks/task-form/task-form.component.css'
    ]
})
export class TaskFormComponent implements OnInit {
    task: TaskModel;

    constructor(
        private taskService: TaskService
    ) {

    }

    ngOnInit() {
        this.task = new TaskModel();
    }

    save() {
        this.taskService.save(this.task)
            .subscribe((data) => {
                console.log(data);
            })
    }

}
