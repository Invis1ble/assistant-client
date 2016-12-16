import { Inject, Injectable, Injector } from '@angular/core';
import { Response } from '@angular/http';

import { Action, Body, Parameter, Query } from 'ng2-rest-service';
import { Observable } from 'rxjs/Observable';

import { AuthenticatedRestService } from '../rest/authenticated-rest.service';
import { Config } from '../config/config';
import { CONFIG } from '../config/config-token';
import { PeriodModel } from './period/period.model';
import { PeriodService } from './period/period.service';
import { TaskCollection } from './task.collection';
import { TaskCollectionResponseBodyToTaskCollectionTransformer } from './task-collection-response-body-to-task-collection.transformer';
import { TaskLocationToTaskModelTransformer } from './task-location-to-task-model.transformer';
import { TaskModel } from './task.model';
import { TaskModelToTaskRequestBodyTransformer } from './task-model-to-task-request-body.transformer';
import { TaskResponseBodyToTaskModelTransformer } from './task-response-body-to-task-model.transformer';
import { UserModel } from '../user/user.model';
import { isPresent } from '../facade/lang';

@Injectable()
export class TaskService extends AuthenticatedRestService {

    constructor(
        injector: Injector,
        @Inject(CONFIG) config: Config,
        private periodService: PeriodService
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

    getUserTasks(user: UserModel, limit: number, offset?: number): Observable<TaskCollection> {
        return this.getTasksByUserId(user.id, limit, offset);
    }

    @Action({
        path: '/users/{id}/tasks',
        responseTransformer: TaskCollectionResponseBodyToTaskCollectionTransformer
    })
    getTasksByUserId(
        @Parameter('id') userId: string,
        @Query('limit') limit: number,
        @Query('offset') offset?: number
    ): Observable<TaskCollection> {
        return null;
    }

    saveTask(user: UserModel, task: TaskModel): Observable<TaskModel> {
        if (isPresent(task.id)) {
            return this.updateTask(task);
        }

        return this.createUserTask(user.id, task);
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

    deleteTask(task: TaskModel): Observable<Response> {
        return this.deleteTaskById(task.id);
    }

    @Action({
        path: '/users/{id}/tasks',
        useRawResponse: true,
        requestTransformer: TaskModelToTaskRequestBodyTransformer,
        responseTransformer: TaskLocationToTaskModelTransformer
    })
    createUserTask(@Parameter('id') userId: string, @Body task: TaskModel): Observable<TaskModel> {
        return null;
    }

    updateTask(task: TaskModel): Observable<TaskModel> {
        return this.updateTaskById(task.id, task);
    }

    @Action({
        path: '/tasks/{id}',
        method: 'PATCH',
        useRawResponse: true,
        requestTransformer: TaskModelToTaskRequestBodyTransformer,
        responseTransformer: TaskLocationToTaskModelTransformer
    })
    updateTaskById(@Parameter('id') id: string, @Body task: TaskModel): Observable<TaskModel> {
        return null;
    }

    @Action({
        path: '/tasks/{id}',
        useRawResponse: true
    })
    deleteTaskById(@Parameter('id') id: string): Observable<Response> {
        return null;
    }

}