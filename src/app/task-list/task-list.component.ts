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
import { SecurityEventBusService } from '../security/security-event-bus.service';
import { Task } from '../task/task';
import { TaskCollection } from '../task/task-collection';
import { TaskPeriodCollection } from '../task/task-period/task-period-collection';
import { TaskPeriodService } from '../task/task-period/task-period.service';
import { TaskService } from '../task/task.service';
import { User } from '../user/user';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends AbstractComponent implements OnInit, OnDestroy {

    tasks: TaskCollection;
    task: Task;
    user: User;

    private userLoggedInSubscription: Subscription;

    constructor(
        snackBar: MdSnackBar,
        private securityEventBus: SecurityEventBusService,
        private taskService: TaskService,
        private taskPeriodService: TaskPeriodService
    ) {
        super(snackBar);

        console.info('TaskListComponent.constructor()');
    }

    ngOnInit() {
        console.info('TaskListComponent.ngOnInit()');

        this.userLoggedInSubscription = this.securityEventBus.userLoggedIn$.subscribe((user: User) => {
            console.log('TaskListComponent.ngOnInit() securityEventBus.userLoggedIn$ onNext');

            this.user = user;

            this.taskService.getUserTasks(user)
                .mergeMap((tasks: TaskCollection): Observable<TaskCollection> => {
                    return Observable.from(tasks.getItems())
                        .mergeMap((task: Task): Observable<Task> => {
                            return this.taskPeriodService.getTaskPeriods(task)
                                .do((periods: TaskPeriodCollection) => task.periods = periods)
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
        this.task = new Task(null, '', '', 20, null, new TaskPeriodCollection());
    }

    onTaskEdit(task: Task): void {
        this.task = task;
    }

    onTaskSaved(task: Task): void {
        this.tasks.update(task);
        this.task = null;
        this.showMessage('Задача успешно сохранена.');
    }

    onTaskDeleted(task: Task): void {
        this.tasks.delete(task);
        this.showMessage('Задача успешно удалена.');
    }

    ngOnDestroy(): void {
        console.info('TaskListComponent.ngOnDestroy()');

        this.userLoggedInSubscription.unsubscribe();
    }

}
