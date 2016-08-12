import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import { AuthService } from '../../shared/auth.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import { TaskModel } from '../shared/task.model';
import { UserModel } from '../../users/shared/user.model';

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
    user = new UserModel();

    constructor(
        private authService: AuthService
    ) {

    }

    addNewTask() {
        this.showTaskForm();
    }

    getUser() {
        this.authService.getUser()
            .subscribe(
                (user: UserModel) => this.user = user,
                this.handleError
            );
    }

    hideTaskForm() {
        this.showingTaskForm = false;
    }

    ngOnInit() {
        this.getUser();
    }

    onFormCanceled() {
        this.hideTaskForm();
    }

    onTaskSaved(task: TaskModel) {
        this.user.tasks.add(task);
        this.hideTaskForm();
    }

    showTaskForm() {
        this.showingTaskForm = true;
    }

    private handleError() {

    }
}