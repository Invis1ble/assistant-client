import { IdAware } from '../shared/id-aware';
import { TaskPeriod } from './task-period/task-period';
import { TaskPeriodCollection } from './task-period/task-period-collection';

export class Task implements IdAware {

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public rate: number,
        public createdAt: Date,
        public periods: TaskPeriodCollection
    ) {

    }

    getTotalTimeSpent(): number {
        return this.periods.getItems()
            .reduce((previousValue, period: TaskPeriod) => {
                return previousValue + period.getDuration();
            }, 0);
    }

    getRevenue(): number {
        return this.getTotalTimeSpent() / 3600000 * this.rate;
    }

    isActive(): boolean {
        const latestPeriod = this.periods.getLatest();

        if (undefined === latestPeriod) {
            return false;
        }

        return latestPeriod.isActive();
    }

}
