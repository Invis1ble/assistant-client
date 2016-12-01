import { Inject, Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import { Body, DefaultHeaders, GET, PATCH, POST, Path, Produces } from '../../ng2-http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CONFIG } from '../../config/config-token';
import { Config } from '../../config/config';
import { RestService } from '../../rest/rest.service';
import { TaskModel } from '../task.model';
import { PeriodModel } from './period.model';
import { PeriodCollection } from './period.collection';
import { PeriodCollectionResponseBody } from './period-collection.response-body';
import { PeriodCollectionResponseBodyToPeriodCollectionTransformer } from './period-collection-response-body-to-period-collection.transformer';
import { PeriodModelToPeriodRequestBodyTransformer } from './period-model-to-period-request-body.transformer';
import { PeriodRequestBody } from './period.request-body';
import { PeriodResponseBody } from './period.response-body';
import { PeriodResponseBodyToPeriodModelTransformer } from './period-response-body-to-period-model.transformer';
import { isPresent } from '../../facade/lang';

@Injectable()
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
})
export class PeriodService extends RestService {

    constructor(
        http: AuthHttp,
        @Inject(CONFIG) config: Config,
        private responseToModelTransformer: PeriodResponseBodyToPeriodModelTransformer,
        private modelToRequestTransformer: PeriodModelToPeriodRequestBodyTransformer,
        private responseToCollectionTransformer: PeriodCollectionResponseBodyToPeriodCollectionTransformer
    ) {
        super(http, config);
    }

    getPeriodById(id: string): Observable<PeriodModel> {
        return this.getPeriodByIdRaw(id)
            .map((body: PeriodResponseBody) => {
                return this.responseToModelTransformer.transform(body);
            });
    }

    getTaskPeriods(task: TaskModel): Observable<PeriodCollection> {
        return this.getTaskPeriodsRaw(task.id)
            .map((body: PeriodCollectionResponseBody): PeriodCollection => {
                return this.responseToCollectionTransformer.transform(body);
            });
    }

    saveTaskPeriod(task: TaskModel, period: PeriodModel): Observable<PeriodModel> {
        if (isPresent(period.id)) {
            return this.updatePeriod(period);
        }

        return this.createTaskPeriod(task, period);
    }

    createTaskPeriod(task: TaskModel, period: PeriodModel): Observable<PeriodModel> {
        return this.createTaskPeriodRaw(task.id, this.modelToRequestTransformer.transform(period))
            .mergeMap((response: Response) => {
                const segments = response.headers.get('Location').split('/');

                return this.getPeriodById(segments[segments.length - 1]);
            });
    }

    updatePeriod(period: PeriodModel): Observable<PeriodModel> {
        return this.updatePeriodRaw(period.id, this.modelToRequestTransformer.transform(period))
            .mergeMap(() => {
                return this.getPeriodById(period.id);
            });
    }

    @GET('/periods/{id}')
    @Produces<PeriodResponseBody>()
    private getPeriodByIdRaw(@Path('id') id: string): Observable<PeriodResponseBody> {
        return null;
    }

    @GET('/tasks/{id}/periods')
    @Produces<PeriodCollectionResponseBody>()
    private getTaskPeriodsRaw(@Path('id') id: string): Observable<PeriodCollectionResponseBody> {
        return null;
    }

    @POST('/tasks/{id}/periods')
    private createTaskPeriodRaw(@Path('id') id: string, @Body period: PeriodRequestBody): Observable<Response> {
        return null;
    }

    @PATCH('/periods/{id}')
    private updatePeriodRaw(@Path('id') id: string, @Body period: PeriodRequestBody): Observable<Response> {
        return null;
    }

}
