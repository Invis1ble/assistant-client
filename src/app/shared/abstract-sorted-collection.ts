import { Collection } from './collection';
import { IdAware } from './id-aware';

export abstract class AbstractSortedCollection<T extends IdAware> extends Collection<T> {

    add(item: T): void {
        super.add(item);

        this.sort();
    }

    delete(item: T) {
        super.delete(item);

        this.sort();
    }

    setItems(items: T[]): void {
        this.items = items;

        this.sort();
    }

    sort(): void {
        this.items.sort(this.sortFn);
    }

    update(item: T) {
        const isReplaced = this.getItems().some((currentItem, i, items) => {
            if (currentItem.id === item.id) {
                items[i] = item;
                return true;
            }
        });

        if (isReplaced) {
            this.sort();
        } else {
            this.add(item);
        }
    }

    protected abstract sortFn(a: T, b: T): number;

}
