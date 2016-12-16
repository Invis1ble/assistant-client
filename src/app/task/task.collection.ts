import { AbstractSortedCollection } from '../shared/abstract-sorted-collection';
import { TaskModel } from './task.model';

export class TaskCollection extends AbstractSortedCollection<TaskModel> {

    protected sortFn(task1: TaskModel, task2: TaskModel): number {
        return task2.createdAt.getTime() - task1.createdAt.getTime();
    }

}
