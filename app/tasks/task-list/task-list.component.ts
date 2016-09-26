import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/auth.service';
import { TaskModel } from '../shared/task.model';
import { UserModel } from '../../users/shared/user.model';
import { SecurityEventBusService } from '../../shared/security/security-event-bus.service';

@Component({
    selector: 'assistant-task-list',
    templateUrl: 'app/tasks/task-list/task-list.component.html',
    styleUrls: [
        'app/tasks/task-list/task-list.component.css'
    ]
})
export class TaskListComponent implements OnInit {
    private showingTaskForm = false;
    user = new UserModel();
    task: TaskModel;

    constructor(
        private authService: AuthService,
        private securityEventBus: SecurityEventBusService
    ) {

    }

    addNewTask() {
        this.task = new TaskModel();
        this.showTaskForm();
    }

    getUser() {
        this.authService.getUser()
            .subscribe(
                (user: UserModel) => {
                    this.user = user;
                    this.securityEventBus.userLoggedIn$.emit(user);
                },
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

    onTaskEdit(task: TaskModel) {
        this.task = task;
        this.showTaskForm();
    }

    onTaskDeleted(task: TaskModel): void {
        this.user.tasks.delete(task);
    }

    onTaskSaved(task: TaskModel) {
        this.user.tasks.update(task);
        this.hideTaskForm();
    }

    showTaskForm() {
        this.showingTaskForm = true;
    }

    private handleError() {

    }
}