import { AbstractSortedCollection } from '../shared/abstract-sorted-collection';
import { Task } from './task';

export class TaskCollection extends AbstractSortedCollection<Task> {

    protected sortFn(task1: Task, task2: Task): number {
        return task2.createdAt.getTime() - task1.createdAt.getTime();
    }

}
