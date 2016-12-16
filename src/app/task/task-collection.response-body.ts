import { CollectionResponseBody } from '../rest/collection.response-body';
import { TaskResponseBody } from './task.response-body';

export type TaskCollectionResponseBody = CollectionResponseBody & {

    entities: TaskResponseBody[];

};
