import { Injectable } from '@angular/core';

import { TaskPeriod } from './task-period';
import { TaskPeriodRequestBody } from './task-period.request-body';
import { TaskPeriodResponseBody } from './task-period.response-body';
import { isPresent } from '../../facade/lang';

@Injectable()
export class TaskPeriodHydratorService {

    hydrate(body: TaskPeriodResponseBody): TaskPeriod {
        let finishedAt;

        if (null === body.finishedAt) {
            finishedAt = null;
        } else {
            finishedAt = new Date(body.finishedAt * 1000);
        }

        return new TaskPeriod(
            body.id,
            new Date(body.startedAt * 1000),
            finishedAt
        );
    }

    dehydrate(period: TaskPeriod): TaskPeriodRequestBody {
        const body: TaskPeriodRequestBody = {
            startedAt: Math.round(period.startedAt.getTime() / 1000)
        };

        if (isPresent(period.finishedAt)) {
            body.finishedAt = Math.round(period.finishedAt.getTime() / 1000);
        }

        return body;
    }

}
