import { AbstractModelCollectionLinks } from './abstract-model-collection.links';
import { AbstractModel } from './abstract.model';

export abstract class AbstractModelCollection implements Iterable<AbstractModel> {
    protected links: AbstractModelCollectionLinks;

    constructor(
        protected items: AbstractModel[] = []
    ) {

    }

    add(item: AbstractModel): void {
        this.items.push(item);
    }

    getItem(index: number): AbstractModel {
        return this.items[index];
    }

    getItems(): AbstractModel[] {
        return this.items;
    }

    getUrl(model?: AbstractModel): string {
        if (undefined === model) {
            return this.links.self.href;
        }

        return this.links.entity.href.replace('{id}', model.id);
    }

    setLinks(links: any): void {
        this.links = links;
    }

    abstract update(item: AbstractModel): void;

    [Symbol.iterator](): Iterator<AbstractModel> {
        let pointer = 0;
        let items = this.items;

        return {
            next(): IteratorResult<AbstractModel> {
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