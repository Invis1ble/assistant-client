import { AbstractSortedCollection } from '../../shared/abstract-sorted-collection';
import { TaskPeriod } from './task-period';

export class TaskPeriodCollection extends AbstractSortedCollection<TaskPeriod> {

    getLatest(): TaskPeriod | undefined {
        return this.getItem(0);
    }

    protected sortFn(period1: TaskPeriod, period2: TaskPeriod): number {
        return period2.startedAt.getTime() - period1.startedAt.getTime();
    }

}
