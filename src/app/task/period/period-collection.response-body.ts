import { CollectionResponseBody } from '../../rest/collection.response-body';
import { PeriodResponseBody } from './period.response-body';

export type PeriodCollectionResponseBody = CollectionResponseBody & {

    entities: PeriodResponseBody[];

};
