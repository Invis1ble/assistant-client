import { PeriodCollectionResponseBody } from './period/period-collection.response-body';

export type TaskResponseBody = {

    id: string;
    title: string;
    description: string;
    rate: number;
    createdAt: number;
    periods?: PeriodCollectionResponseBody;

}