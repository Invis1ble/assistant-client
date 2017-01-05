import { IdAware } from '../shared/id-aware';
import { PeriodModel } from './period/period.model';
import { PeriodCollection } from './period/period.collection';

export class TaskModel implements IdAware {

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public rate: number,
        public createdAt: Date,
        public categoryId: string,
        public periods: PeriodCollection
    ) {

    }

    getTotalTimeSpent(): number {
        return this.periods.getItems()
            .reduce((previousValue, period: PeriodModel) => {
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
