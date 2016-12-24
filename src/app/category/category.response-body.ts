import { TaskCollectionResponseBody } from '../task/task-collection.response-body';

export type CategoryResponseBody = {

    id: string;
    name: string;
    description: string;
    rate: number;
    tasks?: TaskCollectionResponseBody

}