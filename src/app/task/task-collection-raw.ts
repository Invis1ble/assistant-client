import { CollectionRaw } from '../rest/collection-raw';
import { TaskResponseBody } from './task.response-body';

export type TaskCollectionRaw = CollectionRaw & {

    entities: TaskResponseBody[];

};
