import { Inject, Injectable, Injector } from '@angular/core';

import { Action, Body, Parameter } from 'ng2-rest-service';
import { Observable } from 'rxjs/Observable';

import { AuthenticatedRestService } from '../../rest/authenticated-rest.service';
import { CONFIG } from '../../config/config-token';
import { Config } from '../../config/config';
import { PeriodCollection } from './period.collection';
import { PeriodCollectionResponseBodyToPeriodCollectionTransformer } from './period-collection-response-body-to-period-collection.transformer';
import { PeriodLocationToPeriodModelTransformer } from './period-location-to-period-model.transformer';
import { PeriodModel } from './period.model';
import { PeriodModelToPeriodRequestBodyTransformer } from './period-model-to-period-request-body.transformer';
import { PeriodResponseBodyToPeriodModelTransformer } from './period-response-body-to-period-model.transformer';
import { TaskModel } from '../task.model';
import { isPresent } from '../../facade/lang';

@Injectable()
export class PeriodService extends AuthenticatedRestService {

    constructor(
        injector: Injector,
        @Inject(CONFIG) config: Config
    ) {
        super(injector, config);
    }

    @Action({
        path: '/periods/{id}',
        responseTransformer: PeriodResponseBodyToPeriodModelTransformer
    })
    getPeriodById(@Parameter('id') id: string): Observable<PeriodModel> {
        return null;
    }

    getTaskPeriods(task: TaskModel): Observable<PeriodCollection> {
        return this.getPeriodsByTaskId(task.id);
    }

    @Action({
        path: '/tasks/{id}/periods',
        responseTransformer: PeriodCollectionResponseBodyToPeriodCollectionTransformer
    })
    getPeriodsByTaskId(@Parameter('id') id: string): Observable<PeriodCollection> {
        return null;
    }

    savePeriod(task: TaskModel, period: PeriodModel): Observable<PeriodModel> {
        if (isPresent(period.id)) {
            return this.updatePeriod(period);
        }

        return this.createTaskPeriod(task.id, period);
    }

    updatePeriod(period: PeriodModel): Observable<PeriodModel> {
        return this.updatePeriodById(period.id, period);
    }

    @Action({
        path: '/tasks/{id}/periods',
        useRawResponse: true,
        requestTransformer: PeriodModelToPeriodRequestBodyTransformer,
        responseTransformer: PeriodLocationToPeriodModelTransformer
    })
    createTaskPeriod(@Parameter('id') taskId: string, @Body period: PeriodModel): Observable<PeriodModel> {
        return null;
    }

    @Action({
        path: '/periods/{id}',
        method: 'PATCH',
        useRawResponse: true,
        requestTransformer: PeriodModelToPeriodRequestBodyTransformer,
        responseTransformer: PeriodLocationToPeriodModelTransformer
    })
    updatePeriodById(@Parameter('id') id: string, @Body period: PeriodModel): Observable<PeriodModel> {
        return null;
    }

}