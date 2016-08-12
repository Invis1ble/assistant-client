import { PeriodModel } from './period.model';
import { SortableCollection } from './sortable.collection';
import { TaskPeriodLinks } from './task-period-collection.links';

export class TaskPeriodCollection extends SortableCollection<PeriodModel> {
    private links: TaskPeriodLinks;

    getEntityUrl(period: PeriodModel): string {
        return this.links.entity.href.replace('{id}', period.id);
    }

    getLatest() {
        return this.items[0];
    }

    getSelfUrl(): string {
        return this.links.self.href;
    }

    setLinks(links: TaskPeriodLinks) {
        this.links = links;
    }

    sort() {
        this.items.sort((period1: PeriodModel, period2: PeriodModel) => period2.startedAt - period1.startedAt);
    }
}