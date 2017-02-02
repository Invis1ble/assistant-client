import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { MdDialog, MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/withLatestFrom';

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
    categories: CategoryCollection;
    category: CategoryModel;

    private categoriesLoadedSubscription: Subscription;
    private tasksLoadedSubscription: Subscription;
    private taskCreatedSubscription: Subscription;
    private taskUpdatedSubscription: Subscription;
    private taskDeletedSubscription: Subscription;

    private limit: number = 10;
    private pending: boolean = true;
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
            .combineLatest(this.route.params)
            .subscribe(([categories, params]: [CategoryCollection, Params]) => {
                this.categories = categories;

                const category: CategoryModel = categories.findOneById(params['id']);

                if (!isPresent(this.category) || category.id !== this.category.id) {
                    this.category = category;
                    this.clearTasks();
                }

                this.loadCategoryTasks(this.limit);
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

        this.taskCreatedSubscription = this.taskEventBus.taskCreated$
            .filter((task: TaskModel) => task.categoryId === this.category.id)
            .subscribe((task: TaskModel) => {
                this.tasks.add(task);
            });

        this.taskUpdatedSubscription = this.taskEventBus.taskUpdated$
            .subscribe((task: TaskModel) => {
                if (task.categoryId === this.category.id) {
                    this.tasks.update(task);
                } else {
                    this.tasks.delete(task);
                }
            });

        this.taskDeletedSubscription = this.taskEventBus.taskDeleted$
            .filter((task: TaskModel) => task.categoryId === this.category.id)
            .subscribe((task: TaskModel) => {
                this.tasks.delete(task);
            });
    }

    showTaskForm(task?: TaskModel): void {
        if (!isPresent(task)) {
            task = new TaskModel(null, '', '', this.category.rate, null, this.category.id, new PeriodCollection());
        }

        const dialogRef = this.dialog.open(TaskFormComponent);

        dialogRef.componentInstance.categories = this.categories;
        dialogRef.componentInstance.category = this.category;
        dialogRef.componentInstance.task = task;

        dialogRef.afterClosed()
            .filter(isPresent)
            .subscribe(() => {
                this.onTaskSaved();
            });
    }

    private onTaskSaved(): void {
        this.showMessage('Задача успешно сохранена.');
    }

    onTaskDeleted(): void {
        this.showMessage('Задача успешно удалена.');
    }

    loadMoreTasks(): void {
        this.loadCategoryTasks(this.limit, this.tasks.getItems().length);
    }

    ngOnDestroy(): void {
        this.categoriesLoadedSubscription.unsubscribe();
        this.tasksLoadedSubscription.unsubscribe();
        this.taskCreatedSubscription.unsubscribe();
        this.taskUpdatedSubscription.unsubscribe();
        this.taskDeletedSubscription.unsubscribe();
    }

    private loadCategoryTasks(limit: number, offset?: number): void {
        this.pending = true;

        this.taskService.getCategoryTasks(this.category, limit, offset)
            .finally(() => this.pending = false)
            .subscribe(
                (tasks: TaskCollection) => {
                    this.loaded = tasks.getItems().length < this.limit;
                },
                (error: any): void => {
                    this.handleError(error);
                }
            );
    }

    private clearTasks(): void {
        this.tasks = new TaskCollection();
    }

}
