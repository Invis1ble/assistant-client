import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

import { AbstractComponent } from '../shared/abstract-component';
import { SecurityEventBus } from '../security/security.event-bus';
import { TaskModel } from '../task/task.model';
import { TaskCollection } from '../task/task.collection';
import { PeriodCollection } from '../task/period/period.collection';
import { PeriodService } from '../task/period/period.service';
import { TaskService } from '../task/task.service';
import { UserModel } from '../user/user.model';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends AbstractComponent implements OnInit, OnDestroy {

    tasks: TaskCollection;
    task: TaskModel;
    user: UserModel;

    private userLoggedInSubscription: Subscription;

    constructor(
        snackBar: MdSnackBar,
        private securityEventBus: SecurityEventBus,
        private taskService: TaskService,
        private periodService: PeriodService
    ) {
        super(snackBar);
    }

    ngOnInit() {
        this.userLoggedInSubscription = this.securityEventBus.userLoggedIn$.subscribe((user: UserModel) => {
            this.user = user;

            this.taskService.getUserTasks(user)
                .mergeMap((tasks: TaskCollection): Observable<TaskCollection> => {
                    return Observable.from(tasks.getItems())
                        .mergeMap((task: TaskModel): Observable<TaskModel> => {
                            return this.periodService.getTaskPeriods(task)
                                .do((periods: PeriodCollection) => task.periods = periods)
                                .map(() => task)
                        })
                        .toArray()
                        .map(() => tasks);
                })
                .subscribe(
                    (tasks: TaskCollection) => {
                        this.tasks = tasks;
                    },
                    (response: Response): void => {
                        this.handleError(response);
                    }
                );
        });
    }

    onFormCanceled(): void {
        this.task = null;
    }

    addNewTask(): void {
        this.task = new TaskModel(null, '', '', 20, null, new PeriodCollection());
    }

    onTaskEdit(task: TaskModel): void {
        this.task = task;
    }

    onTaskSaved(task: TaskModel): void {
        this.tasks.update(task);
        this.task = null;
        this.showMessage('Задача успешно сохранена.');
    }

    onTaskDeleted(task: TaskModel): void {
        this.tasks.delete(task);
        this.showMessage('Задача успешно удалена.');
    }

    ngOnDestroy(): void {
        this.userLoggedInSubscription.unsubscribe();
    }

}
