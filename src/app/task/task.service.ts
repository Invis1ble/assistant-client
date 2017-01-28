import { Inject, Injectable, Injector } from '@angular/core';
import { Response } from '@angular/http';

import { Action, Body, Parameter, Query } from 'ng2-rest-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthenticatedRestService } from '../rest/authenticated-rest.service';
import { CONFIG } from '../config/config-token';
import { CategoryModel } from '../category/category.model';
import { Config } from '../config/config';
import { PeriodModel } from './period/period.model';
import { PeriodService } from './period/period.service';
import { TaskCollection } from './task.collection';
import { TaskCollectionResponseBodyToTaskCollectionTransformer } from './task-collection-response-body-to-task-collection.transformer';
import { TaskEventBus } from './task.event-bus';
import { TaskLocationToTaskModelTransformer } from './task-location-to-task-model.transformer';
import { TaskModel } from './task.model';
import { TaskModelToCreateTaskRequestBodyTransformer } from './task-model-to-create-task-request-body.transformer';
import { TaskModelToUpdateTaskRequestBodyTransformer } from './task-model-to-update-task-request-body.transformer';
import { TaskResponseBodyToTaskModelTransformer } from './task-response-body-to-task-model.transformer';
import { isPresent } from '../facade/lang';

@Injectable()
export class TaskService extends AuthenticatedRestService {

    constructor(
        injector: Injector,
        @Inject(CONFIG) config: Config,
        private periodService: PeriodService,
        private taskEventBus: TaskEventBus
    ) {
        super(injector, config);
    }

    @Action({
        path: '/tasks/{id}',
        responseTransformer: TaskResponseBodyToTaskModelTransformer
    })
    getTaskById(@Parameter('id') id: string): Observable<TaskModel> {
        return null;
    }

    getCategoryTasks(category: CategoryModel, limit: number, offset?: number): Observable<TaskCollection> {
        return this.getTasksByCategoryId(category.id, limit, offset)
            .do((tasks: TaskCollection) => {
                this.taskEventBus.tasksLoaded$.next(tasks);
            });
    }

    saveTask(category: CategoryModel, task: TaskModel): Observable<TaskModel> {
        let task$: Observable<TaskModel>;

        if (isPresent(task.id)) {
            task$ = this.updateTask(task);
        } else {
            task$ = this.createTask(category, task);
        }

        return task$.do((task: TaskModel) => {
            this.taskEventBus.taskSaved$.next(task);
        });
    }

    createTask(category: CategoryModel, task: TaskModel): Observable<TaskModel> {
        return this.createCategoryTask(category.id, task)
            .do((task: TaskModel) => {
                this.taskEventBus.taskCreated$.next(task);
            });
    }

    updateTask(task: TaskModel): Observable<TaskModel> {
        return this.updateTaskById(task.id, task)
            .do((task: TaskModel) => {
                this.taskEventBus.taskUpdated$.next(task);
            });
    }

    deleteTask(task: TaskModel): Observable<Response> {
        return this.deleteTaskById(task.id)
            .do(() => {
                this.taskEventBus.taskDeleted$.next(task);
            });
    }

    toggleRun(task: TaskModel): Observable<TaskModel> {
        if (task.isActive()) {
            const period = task.periods.getLatest();

            period.finishedAt = new Date();

            return this.periodService.savePeriod(task, period)
                .map((period: PeriodModel) => {
                    return task;
                });
        }

        return this.periodService.savePeriod(task, new PeriodModel(null, new Date(), null))
            .map((period: PeriodModel) => {
                task.periods.add(period);
                return task;
            });
    }

    @Action({
        path: '/categories/{id}/tasks',
        responseTransformer: TaskCollectionResponseBodyToTaskCollectionTransformer
    })
    private getTasksByCategoryId(
        @Parameter('id') categoryId: string,
        @Query('limit') limit: number,
        @Query('offset') offset?: number
    ): Observable<TaskCollection> {
        return null;
    }

    @Action({
        path: '/categories/{id}/tasks',
        useRawResponse: true,
        requestTransformer: TaskModelToCreateTaskRequestBodyTransformer,
        responseTransformer: TaskLocationToTaskModelTransformer
    })
    private createCategoryTask(@Parameter('id') categoryId: string, @Body task: TaskModel): Observable<TaskModel> {
        return null;
    }

    @Action({
        path: '/tasks/{id}',
        method: 'PATCH',
        useRawResponse: true,
        requestTransformer: TaskModelToUpdateTaskRequestBodyTransformer,
        responseTransformer: TaskLocationToTaskModelTransformer
    })
    private updateTaskById(@Parameter('id') id: string, @Body task: TaskModel): Observable<TaskModel> {
        return null;
    }

    @Action({
        path: '/tasks/{id}',
        useRawResponse: true
    })
    private deleteTaskById(@Parameter('id') id: string): Observable<Response> {
        return null;
    }

}