import { PeriodModel } from './period.model';
import { TaskPeriodLinks } from './task-period-collection.links';

export class TaskPeriodCollection {

    constructor(
        private periods: PeriodModel[] = [],
        private links: TaskPeriodLinks
    ) {
        this.sort();
    }

    add(period: PeriodModel) {
        this.periods.push(period);
        this.sort();
    }

    getItem(index: number) {
        return this.periods[index];
    }

    getItems() {
        return this.periods;
    }
    
    getLatest() {
        return this.periods[0];
    }

    getSelfUrl(): string {
        return this.links.self.href;
    }

    getEntityUrl(period: PeriodModel): string {
        return this.links.entity.href.replace('{id}', period.id);
    }

    sort() {
        this.periods.sort((period1: PeriodModel, period2: PeriodModel) => period2.startedAt - period1.startedAt);
    }
}