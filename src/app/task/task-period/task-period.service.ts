import { Inject, Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { Body, DefaultHeaders, GET, PATCH, POST, Path, Produces } from '../../ng2-http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CONFIG } from '../../config/config-token';
import { Config } from '../../config/config';
import { RestService } from '../../rest/rest.service';
import { Task } from '../task';
import { TaskPeriod } from './task-period';
import { TaskPeriodCollection } from './task-period-collection';
import { TaskPeriodCollectionHydratorService } from './task-period-collection-hydrator.service';
import { TaskPeriodCollectionRaw } from './task-period-collection-raw';
import { TaskPeriodHydratorService } from './task-period-hydrator.service';
import { TaskPeriodRequestBody } from './task-period.request-body';
import { isPresent } from '../../facade/lang';
import { TaskPeriodResponseBody } from './task-period.response-body';

@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})
export class TaskPeriodService extends RestService {

    constructor(
        http: AuthHttp,
        @Inject(CONFIG) config: Config,
        private taskPeriodCollectionHydrator: TaskPeriodCollectionHydratorService,
        private taskPeriodHydrator: TaskPeriodHydratorService
    ) {
        super(http, config);
    }

    getPeriodById(id: string): Observable<TaskPeriod> {
        return this.getPeriodByIdRaw(id)
            .map((body: TaskPeriodResponseBody) => {
                return this.taskPeriodHydrator.hydrate(body);
            });
    }

    getTaskPeriods(task: Task): Observable<TaskPeriodCollection> {
        return this.getTaskPeriodsRaw(task.id)
            .map((body: TaskPeriodCollectionRaw): TaskPeriodCollection => {
                return this.taskPeriodCollectionHydrator.hydrate(body);
            });
    }

    saveTaskPeriod(task: Task, period: TaskPeriod): Observable<TaskPeriod> {
        if (isPresent(period.id)) {
            return this.updatePeriod(period);
        }

        return this.createTaskPeriod(task, period);
    }

    createTaskPeriod(task: Task, period: TaskPeriod): Observable<TaskPeriod> {
        return this.createTaskPeriodRaw(task.id, this.taskPeriodHydrator.dehydrate(period))
            .mergeMap((response: Response) => {
                const segments = response.headers.get('Location').split('/');

                return this.getPeriodById(segments[segments.length - 1]);
            });
    }

    updatePeriod(period: TaskPeriod): Observable<TaskPeriod> {
        return this.updatePeriodRaw(period.id, this.taskPeriodHydrator.dehydrate(period))
            .mergeMap(() => {
                return this.getPeriodById(period.id);
            });
    }

    @GET('/periods/{id}')
    @Produces<TaskPeriodResponseBody>()
    private getPeriodByIdRaw(@Path('id') id: string): Observable<TaskPeriodResponseBody> {
        return null;
    }

    @GET('/tasks/{id}/periods')
    @Produces<TaskPeriodCollectionRaw>()
    private getTaskPeriodsRaw(@Path('id') id: string): Observable<TaskPeriodCollectionRaw> {
        return null;
    }

    @POST('/tasks/{id}/periods')
    private createTaskPeriodRaw(@Path('id') id: string, @Body period: TaskPeriodRequestBody): Observable<Response> {
        return null;
    }

    @PATCH('/periods/{id}')
    private updatePeriodRaw(@Path('id') id: string, @Body period: TaskPeriodRequestBody): Observable<Response> {
        return null;
    }

}
