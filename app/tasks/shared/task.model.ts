import { PeriodModel } from './period.model';
import { TaskPeriodCollection } from './task-period.collection';

export class TaskModel {
    id: string;
    title: string;
    description: string;
    rate = 20;
    createdAt: number;
    periods: TaskPeriodCollection = new TaskPeriodCollection();

    get isActive(): boolean {
        let latestPeriod = this.periods.getLatest();

        if (undefined === latestPeriod) {
            return false;
        }

        return latestPeriod.isActive;
    }

    get revenue(): number {
        return this.totalTimeSpent / 3600000 * this.rate;
    }

    get totalTimeSpent(): number {
        return this.periods.getItems()
            .reduce((previousValue, periodModel: PeriodModel) => {
                return previousValue + periodModel.duration;
            }, 0);
    }
}