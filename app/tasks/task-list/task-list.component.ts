import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import { TaskCollection } from '../shared/task.collection';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import { TaskModel } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
    selector: 'assistant-task-list',
    templateUrl: 'app/tasks/task-list/task-list.component.html',
    styleUrls: [
        'app/tasks/task-list/task-list.component.css'
    ],
    directives: [
        MD_BUTTON_DIRECTIVES,
        MdIcon,
        TaskFormComponent,
        TaskListItemComponent
    ],
    providers: [
        MdIconRegistry
    ],
})
export class TaskListComponent implements OnInit {
    showingTaskForm = true;
    tasks: TaskCollection;

    constructor(
        private taskService: TaskService
    ) {

    }

    addNewTask() {
        this.showTaskForm();
    }

    getTasks() {
        this.taskService
            .getTasks()
            .subscribe(
                (tasks: TaskCollection) => this.tasks = tasks,
                this.handleError
            );
    }

    hideTaskForm() {
        this.showingTaskForm = false;
    }

    ngOnInit() {
        this.getTasks();
    }

    onFormCanceled() {
        this.hideTaskForm();
    }

    onTaskSaved(task: TaskModel) {
        this.tasks.add(task);
        this.hideTaskForm();
    }

    showTaskForm() {
        this.showingTaskForm = true;
    }

    private handleError() {

    }
}