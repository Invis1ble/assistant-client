import { IdAware } from './id-aware';

export class Collection<T extends IdAware> implements Iterable<T> {

    protected items: T[];

    constructor(
        items: T[] = []
    ) {
        this.setItems(items);
    }

    add(item: T): void {
        this.getItems().push(item);
    }

    delete(item: T): void {
        this.items = this.getItems().filter((_item: T): boolean => {
            return item.id !== _item.id;
        });
    }

    getItem(index: number): T | undefined {
        return this.getItems()[index];
    }

    getItems(): T[] {
        return this.items;
    }

    setItems(items: T[]): void {
        this.items = items;
    }

    merge(collection: Collection<T>): this {
        return new (this.constructor as typeof Collection)(this.getItems().concat(collection.getItems())) as this;
    }

    [Symbol.iterator](): Iterator<T> {
        let pointer = 0;
        const items = this.getItems();

        return {
            next(): IteratorResult<T> {
                if (pointer < items.length) {
                    return {
                        done: false,
                        value: items[pointer ++]
                    };
                }

                return {
                    done: true,
                    value: undefined
                };
            }
        };
    }

}
