import { Injectable } from '@angular/core';

import { PeriodModel } from './period.model';
import { PeriodResponseBody } from './period.response-body';

@Injectable()
export class PeriodResponseBodyToPeriodModelTransformer {

    transform(data: PeriodResponseBody): PeriodModel {
        let finishedAt;

        if (null === data.finishedAt) {
            finishedAt = null;
        } else {
            finishedAt = new Date(data.finishedAt * 1000);
        }

        return new PeriodModel(
            data.id,
            new Date(data.startedAt * 1000),
            finishedAt
        );
    }

}
