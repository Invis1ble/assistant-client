import { Component, OnInit } from '@angular/core';

import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import { TaskModel } from '../shared/task.model';
import { TaskService } from '../shared/task.service';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
    selector: 'assistant-task-list',
    templateUrl: 'app/tasks/task-list/task-list.component.html',
    styleUrls: [
        'app/tasks/task-list/task-list.component.css'
    ],
    directives: [
        TaskListItemComponent,
        TaskFormComponent
    ]
})
export class TaskListComponent implements OnInit {
    errorMessage: string;
    tasks: TaskModel[];
    addingTask = false;

    constructor(
        private taskService: TaskService
    ) {

    }

    ngOnInit() {
        this.getTasks();
    }

    addNewTask() {
        this.addingTask = true;
    }

    getTasks() {
        this.taskService
            .getTasks()
            .subscribe(
                tasks => {
                    this.tasks = tasks.sort((task1: TaskModel, task2: TaskModel) => task2.createdAt - task1.createdAt);
                },
                error => this.errorMessage = error
            );
    }

    private handleError() {

    }
}