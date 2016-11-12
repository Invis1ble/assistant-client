import { Injectable } from '@angular/core';

import { TaskHydratorService } from './task-hydrator.service';
import { TaskCollectionRaw } from './task-collection-raw';
import { TaskCollection } from './task-collection';

@Injectable()
export class TaskCollectionHydratorService {

    constructor(
        private taskHydrator: TaskHydratorService
    ) {

    }

    hydrate(data: TaskCollectionRaw): TaskCollection {
        return new TaskCollection(
            data.entities.map(this.taskHydrator.hydrate, this.taskHydrator)
        );
    }

}
