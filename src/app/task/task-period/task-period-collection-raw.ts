import { CollectionRaw } from '../../rest/collection-raw';
import { TaskPeriodResponseBody } from './task-period.response-body';

export type TaskPeriodCollectionRaw = CollectionRaw & {

    entities: TaskPeriodResponseBody[];

};
