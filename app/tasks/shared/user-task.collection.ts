import { AbstractSortableCollection } from './sortable.collection';
import { TaskModel } from './task.model';

export class UserTaskCollection extends AbstractSortableCollection {
    sort() {
        this.items.sort((task1: TaskModel, task2: TaskModel) => task2.createdAt - task1.createdAt);
    }
}