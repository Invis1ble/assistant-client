import { Inject, Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { Body, DELETE, DefaultHeaders, GET, PATCH, POST, Path, Produces, Query } from '../ng2-http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CONFIG } from '../config/config-token';
import { Config } from '../config/config';
import { PeriodModel } from './period/period.model';
import { PeriodService } from './period/period.service';
import { RestService } from '../rest/rest.service';
import { TaskModel } from './task.model';
import { TaskCollection } from './task.collection';
import { TaskCollectionResponseBody } from './task-collection.response-body';
import { TaskCollectionResponseBodyToTaskCollectionTransformer } from './task-collection-response-body-to-task-collection.transformer';
import { TaskModelToTaskRequestBodyTransformer } from './task-model-to-task-request-body.transformer';
import { TaskRequestBody } from './task.request-body';
import { TaskResponseBody } from './task.response-body';
import { TaskResponseBodyToTaskModelTransformer } from './task-response-body-to-task-model.transformer';
import { UserModel } from '../user/user.model';
import { isPresent } from '../facade/lang';

@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})
export class TaskService extends RestService {

    constructor(
        http: AuthHttp,
        @Inject(CONFIG) config: Config,
        private responseToModelTransformer: TaskResponseBodyToTaskModelTransformer,
        private modelToRequestTransformer: TaskModelToTaskRequestBodyTransformer,
        private responseToCollectionTransformer: TaskCollectionResponseBodyToTaskCollectionTransformer,
        private periodService: PeriodService
    ) {
        super(http, config);
    }

    getTaskById(id: string): Observable<TaskModel> {
        return this.getTaskByIdRaw(id)
            .map((data: TaskResponseBody) => {
                return this.responseToModelTransformer.transform(data);
            });
    }

    getUserTasks(user: UserModel, limit: number, offset?: number): Observable<TaskCollection> {
        return this.getUserTasksRaw(user.id, limit, offset)
            .map((data: TaskCollectionResponseBody): TaskCollection => {
                return this.responseToCollectionTransformer.transform(data);
            });
    }

    saveTask(user: UserModel, task: TaskModel): Observable<TaskModel> {
        if (isPresent(task.id)) {
            return this.updateTask(task);
        }

        return this.createUserTask(user, task);
    }

    createUserTask(user: UserModel, task: TaskModel): Observable<TaskModel> {
        return this.createUserTaskRaw(user.id, this.modelToRequestTransformer.transform(task))
            .mergeMap((response: Response) => {
                const segments = response.headers.get('Location').split('/');

                return this.getTaskById(segments[segments.length - 1]);
            });
    }

    updateTask(task: TaskModel): Observable<TaskModel> {
        return this.updateTaskRaw(task.id, this.modelToRequestTransformer.transform(task))
            .mergeMap((response: Response) => {
                return this.getTaskById(task.id);
            });
    }

    toggleRun(task: TaskModel): Observable<TaskModel> {
        if (task.isActive()) {
            const period = task.periods.getLatest();

            period.finishedAt = new Date();

            return this.periodService.saveTaskPeriod(task, period)
                .map((period: PeriodModel) => {
                    return task;
                });
        }

        return this.periodService.saveTaskPeriod(task, new PeriodModel(null, new Date(), null))
            .map((period: PeriodModel) => {
                task.periods.add(period);
                return task;
            });
    }

    deleteTask(task: TaskModel): Observable<TaskModel> {
        return this.deleteTaskByIdRaw(task.id)
            .map(() => task);
    }

    @GET('/tasks/{id}')
    @Produces<TaskResponseBody>()
    private getTaskByIdRaw(@Path('id') id: string): Observable<TaskResponseBody> {
        return null;
    }

    @GET('/users/{id}/tasks')
    @Produces<TaskCollectionResponseBody>()
    private getUserTasksRaw(
        @Path('id') id: string,
        @Query('limit') limit: number,
        @Query('offset') offset?: number
    ): Observable<TaskCollectionResponseBody> {
        return null;
    }

    @POST('/users/{id}/tasks')
    private createUserTaskRaw(@Path('id') id: string, @Body task: TaskRequestBody): Observable<Response> {
        return null;
    }

    @PATCH('/tasks/{id}')
    private updateTaskRaw(@Path('id') id: string, @Body task: TaskRequestBody): Observable<Response> {
        return null;
    }

    @DELETE('/tasks/{id}')
    private deleteTaskByIdRaw(@Path('id') id: string): Observable<Response> {
        return null;
    }

}
