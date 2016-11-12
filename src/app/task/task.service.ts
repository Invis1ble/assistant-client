import { Inject, Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { Body, DELETE, DefaultHeaders, GET, PATCH, POST, Path, Produces } from '../ng2-http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CONFIG } from '../config/config-token';
import { Config } from '../config/config';
import { RestService } from '../rest/rest.service';
import { Task } from './task';
import { TaskCollection } from './task-collection';
import { TaskCollectionHydratorService } from './task-collection-hydrator.service';
import { TaskCollectionRaw } from './task-collection-raw';
import { TaskHydratorService } from './task-hydrator.service';
import { TaskPeriod } from './task-period/task-period';
import { TaskPeriodService } from './task-period/task-period.service';
import { TaskRequestBody } from './task.request-body';
import { TaskResponseBody } from './task.response-body';
import { User } from '../user/user';
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
        private taskHydrator: TaskHydratorService,
        private taskCollectionHydrator: TaskCollectionHydratorService,
        private periodService: TaskPeriodService
    ) {
        super(http, config);
    }

    getTaskById(id: string): Observable<Task> {
        return this.getTaskByIdRaw(id)
            .map((data: TaskResponseBody) => {
                return this.taskHydrator.hydrate(data);
            });
    }

    getUserTasks(user: User): Observable<TaskCollection> {
        return this.getUserTasksRaw(user.id)
            .map((data: TaskCollectionRaw): TaskCollection => {
                return this.taskCollectionHydrator.hydrate(data);
            });
    }

    saveTask(user: User, task: Task): Observable<Task> {
        if (isPresent(task.id)) {
            return this.updateTask(task);
        }

        return this.createUserTask(user, task);
    }

    createUserTask(user: User, task: Task): Observable<Task> {
        return this.createUserTaskRaw(user.id, this.taskHydrator.dehydrate(task))
            .mergeMap((response: Response) => {
                const segments = response.headers.get('Location').split('/');

                return this.getTaskById(segments[segments.length - 1]);
            });
    }

    updateTask(task: Task): Observable<Task> {
        return this.updateTaskRaw(task.id, this.taskHydrator.dehydrate(task))
            .mergeMap((response: Response) => {
                return this.getTaskById(task.id);
            });
    }

    toggleRun(task: Task): Observable<Task> {
        if (task.isActive()) {
            const period = task.periods.getLatest();

            period.finishedAt = new Date();

            return this.periodService.saveTaskPeriod(task, period)
                .map((period: TaskPeriod) => {
                    return task;
                });
        }

        return this.periodService.saveTaskPeriod(task, new TaskPeriod(null, new Date(), null))
            .map((period: TaskPeriod) => {
                task.periods.add(period);
                return task;
            });
    }

    deleteTask(task: Task): Observable<Task> {
        return this.deleteTaskByIdRaw(task.id)
            .map(() => task);
    }

    @GET('/tasks/{id}')
    @Produces<TaskResponseBody>()
    private getTaskByIdRaw(@Path('id') id: string): Observable<TaskResponseBody> {
        return null;
    }

    @GET('/users/{id}/tasks')
    @Produces<TaskCollectionRaw>()
    private getUserTasksRaw(@Path('id') id: string): Observable<TaskCollectionRaw> {
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
