import { TaskPeriodCollectionRaw } from './task-period/task-period-collection-raw';

export type TaskResponseBody = {

    id: string;
    title: string;
    description: string;
    rate: number;
    createdAt: number;
    periods?: TaskPeriodCollectionRaw;

}