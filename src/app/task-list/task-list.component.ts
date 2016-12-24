import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { MdDialog, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';

import { AbstractComponent } from '../shared/abstract-component';
import { CategoryCollection } from '../category/category.collection';
import { CategoryEventBus } from '../category/category.event-bus';
import { CategoryModel } from '../category/category.model';
import { PeriodCollection } from '../task/period/period.collection';
import { PeriodService } from '../task/period/period.service';
import { TaskCollection } from '../task/task.collection';
import { TaskEventBus } from '../task/task.event-bus';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskModel } from '../task/task.model';
import { TaskService } from '../task/task.service';
import { isPresent } from '../facade/lang';

@Component({
    selector: 'app-task-list.primary-component-layout',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends AbstractComponent implements OnInit, OnDestroy {

    tasks: TaskCollection = new TaskCollection();
    category: CategoryModel;

    private categoriesLoadedSubscription: Subscription;
    private tasksLoadedSubscription: Subscription;
    private taskSavedSubscription: Subscription;
    private taskDeletedSubscription: Subscription;

    private limit: number = 10;
    private pending: boolean;
    private loaded: boolean = false;

    constructor(
        snackBar: MdSnackBar,
        private categoryEventBus: CategoryEventBus,
        private taskEventBus: TaskEventBus,
        private taskService: TaskService,
        private periodService: PeriodService,
        private route: ActivatedRoute,
        private dialog: MdDialog
    ) {
        super(snackBar);
    }

    ngOnInit() {
        this.categoriesLoadedSubscription = this.categoryEventBus.categoriesLoaded$
            .subscribe((categories: CategoryCollection) => {
                this.route.params.forEach((params: Params) => {
                    this.category = categories.findOneById(params['id']);
                    this.loadCategoryTasks(this.limit);
                });
            });

        this.tasksLoadedSubscription = this.taskEventBus.tasksLoaded$
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
            .subscribe((tasks: TaskCollection) => {
                this.tasks = tasks.merge(this.tasks);
            });
        
        this.taskSavedSubscription = this.taskEventBus.taskSaved$
            .subscribe((task: TaskModel) => {
                this.tasks.update(task);
            });

        this.taskDeletedSubscription = this.taskEventBus.taskDeleted$
            .subscribe((task: TaskModel) => {
                this.tasks.delete(task);
            });
    }

    showTaskForm(task?: TaskModel): void {
        if (!isPresent(task)) {
            task = new TaskModel(null, '', '', 20, null, new PeriodCollection());
        }

        const dialogRef = this.dialog.open(TaskFormComponent);

        dialogRef.componentInstance.category = this.category;
        dialogRef.componentInstance.task = task;

        dialogRef.afterClosed()
            .filter((result?: TaskModel): boolean => isPresent(result))
            .subscribe((task: TaskModel) => {
                this.onTaskSaved(task);
            });
    }

    private onTaskSaved(task: TaskModel): void {
        this.showMessage('Задача успешно сохранена.');
    }

    onTaskDeleted(task: TaskModel): void {
        this.showMessage('Задача успешно удалена.');
    }

    loadMoreTasks(): void {
        this.loadCategoryTasks(this.limit, this.tasks.getItems().length);
    }

    ngOnDestroy(): void {
        this.categoriesLoadedSubscription.unsubscribe();
        this.tasksLoadedSubscription.unsubscribe();
        this.taskSavedSubscription.unsubscribe();
        this.taskDeletedSubscription.unsubscribe();
    }

    private loadCategoryTasks(limit: number, offset?: number): void {
        this.pending = true;

        this.taskService.getCategoryTasks(this.category, limit, offset)
            .finally(() => this.pending = false)
            .subscribe(
                (tasks: TaskCollection) => {
                    if (!tasks.getItems().length) {
                        this.loaded = true;

                        return;
                    }
                },
                (response: Response): void => {
                    this.handleError(response);
                }
            );
    }

}
