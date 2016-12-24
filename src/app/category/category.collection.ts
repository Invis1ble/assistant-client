import { AbstractSortedCollection } from '../shared/abstract-sorted-collection';
import { CategoryModel } from './category.model';

export class CategoryCollection extends AbstractSortedCollection<CategoryModel> {

    protected sortFn(category1: CategoryModel, category2: CategoryModel): number {
        if (category1.name === category2.name) {
            return 0;
        }

        return category1.name > category2.name ? 1 : -1;
    }

}
