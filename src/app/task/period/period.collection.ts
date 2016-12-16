import { AbstractSortedCollection } from '../../shared/abstract-sorted-collection';
import { PeriodModel } from './period.model';

export class PeriodCollection extends AbstractSortedCollection<PeriodModel> {

    getLatest(): PeriodModel | undefined {
        return this.getItem(0);
    }

    protected sortFn(period1: PeriodModel, period2: PeriodModel): number {
        return period2.startedAt.getTime() - period1.startedAt.getTime();
    }

}
