import { PeriodModel } from './period.model';
import { TaskPeriodCollection } from "./task-period.collection";

export class TaskModel {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public rate: number,
        public createdAt: number,
        public periods: TaskPeriodCollection
    ) {
        
    }

    get isActive(): boolean {
        return this.periods.getLatest().isActive;
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