import { Injectable } from '@angular/core';

import { TaskPeriodHydratorService } from './task-period-hydrator.service';
import { TaskPeriodCollectionRaw } from './task-period-collection-raw';
import { TaskPeriodCollection } from './task-period-collection';

@Injectable()
export class TaskPeriodCollectionHydratorService {

    constructor(
        private taskPeriodHydrator: TaskPeriodHydratorService
    ) {

    }

    hydrate(data: TaskPeriodCollectionRaw): TaskPeriodCollection {
        return new TaskPeriodCollection(
            data.entities.map(this.taskPeriodHydrator.hydrate, this.taskPeriodHydrator)
        );
    }

}
