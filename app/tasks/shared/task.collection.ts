import { SortableCollection } from './sortable.collection';
import { TaskModel } from './task.model';

export class TaskCollection extends SortableCollection<TaskModel> {
    getLatest() {
        return this.items[0];
    }

    sort() {
        this.items.sort((task1: TaskModel, task2: TaskModel) => task2.createdAt - task1.createdAt);
    }
}