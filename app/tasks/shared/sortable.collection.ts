export abstract class SortableCollection<T> implements Iterable<T> {
    constructor(
        protected items: T[] = []
    ) {
        this.sort();
    }

    add(item: T) {
        this.items.push(item);
        this.sort();
    }

    getItem(index: number): T {
        return this.items[index];
    }

    getItems(): T[] {
        return this.items;
    }

    abstract sort(): void;

    [Symbol.iterator](): Iterator<T> {
        let pointer = 0;
        let items = this.items;

        return {
            next(): IteratorResult<T> {
                if (pointer < items.length) {
                    return {
                        done: false,
                        value: items[pointer ++]
                    };
                } else {
                    return {
                        done: true
                    };
                }
            }
        };
    }
}