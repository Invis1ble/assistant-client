import { AbstractModelCollectionLinks } from './abstract-model-collection.links';
import { AbstractModel } from './abstract.model';
import { Link } from './link';
import { isPresent } from '../../shared/facade/lang';

export abstract class AbstractModelCollection implements Iterable<AbstractModel> {
    protected links: AbstractModelCollectionLinks;

    constructor(
        protected items: AbstractModel[] = []
    ) {

    }

    add(item: AbstractModel): void {
        this.getItems().push(item);
    }

    delete(item: AbstractModel): AbstractModelCollection {
        this.items = this.getItems().filter((_item: AbstractModel): boolean => {
            return item.id !== _item.id;
        });

        return this;
    }

    getItem(index: number): AbstractModel {
        return this.getItems()[index];
    }

    getItems(): AbstractModel[] {
        return this.items;
    }

    getLink(model?: AbstractModel): Link {
        if (isPresent(model)) {
            return this.links.entity;
        }

        return this.links.self;
    }

    setLinks(links: AbstractModelCollectionLinks): void {
        this.links = links;
    }

    abstract update(item: AbstractModel): void;

    [Symbol.iterator](): Iterator<AbstractModel> {
        let pointer = 0;
        let items = this.getItems();

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