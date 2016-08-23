import { AbstractSortableCollection } from './sortable.collection';
import { PeriodModel } from './period.model';

export class TaskPeriodCollection extends AbstractSortableCollection {
    sort() {
        this.items.sort((period1: PeriodModel, period2: PeriodModel) => period2.startedAt - period1.startedAt);
    }
}