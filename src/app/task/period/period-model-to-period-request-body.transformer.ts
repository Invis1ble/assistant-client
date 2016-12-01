import { Injectable } from '@angular/core';

import { PeriodModel } from './period.model';
import { PeriodRequestBody } from './period.request-body';
import { isPresent } from '../../facade/lang';

@Injectable()
export class PeriodModelToPeriodRequestBodyTransformer {

    transform(period: PeriodModel): PeriodRequestBody {
        const body: PeriodRequestBody = {
            startedAt: Math.round(period.startedAt.getTime() / 1000)
        };

        if (isPresent(period.finishedAt)) {
            body.finishedAt = Math.round(period.finishedAt.getTime() / 1000);
        }

        return body;
    }

}
