import { CategoryResponseBody } from './category.response-body';
import { CollectionResponseBody } from '../rest/collection.response-body';

export type CategoryCollectionResponseBody = CollectionResponseBody & {

    entities: CategoryResponseBody[];

};
