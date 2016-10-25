import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { MdSnackBar } from '@angular/material';

import { AuthService } from '../../shared/auth.service';
import { TaskModel } from '../shared/task.model';
import { UserModel } from '../../users/shared/user.model';
import { SecurityEventBusService } from '../../shared/security/security-event-bus.service';
import { AbstractComponent } from '../../shared/abstract.component';

@Component({
    selector: 'assistant-task-list',
    templateUrl: 'app/tasks/task-list/task-list.component.html',
    styleUrls: [
        'app/tasks/task-list/task-list.component.css'
    ]
})
export class TaskListComponent extends AbstractComponent implements OnInit {
    private showingTaskForm = false;
    user = new UserModel();
    task: TaskModel;

    constructor(
        snackBar: MdSnackBar,
        viewContainerRef: ViewContainerRef,
        private authService: AuthService,
        private securityEventBus: SecurityEventBusService
    ) {
        super(snackBar, viewContainerRef);
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
                (response: Response): void => {
                    this.handleError(response);
                }
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
        this.showMessage('Задача успешно удалена.');
    }

    onTaskSaved(task: TaskModel) {
        this.user.tasks.update(task);
        this.hideTaskForm();
        this.showMessage('Задача успешно сохранена.');
    }

    showTaskForm() {
        this.showingTaskForm = true;
    }
}