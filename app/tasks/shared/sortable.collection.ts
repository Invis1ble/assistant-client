import { AbstractModelCollection } from './abstract-model.collection';
import { AbstractModel } from './abstract.model';

export abstract class AbstractSortableCollection extends AbstractModelCollection {
    constructor(
        protected items: AbstractModel[] = []
    ) {
        super(items);

        this.sort();
    }

    add(item: AbstractModel): void {
        super.add(item);

        this.sort();
    }

    getLatest(): AbstractModel {
        return this.items[0];
    }

    abstract sort(): void;

    update(item: AbstractModel) {
        let replaced = this.getItems().some((currentItem, i, items) => {
            if (currentItem.id === item.id) {
                items[i] = item;
                return true;
            }
        });

        if (replaced) {
            this.sort();
        } else {
            this.add(item);
        }
    }
}