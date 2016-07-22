import { TaskModel } from './task.model';

export class TaskCollection {

    constructor(
        private tasks: TaskModel[] = []
    ) {
        this.sort();
    }

    add(period: TaskModel) {
        this.tasks.push(period);
        this.sort();
    }

    getItem(index: number) {
        return this.tasks[index];
    }

    getItems() {
        return this.tasks;
    }

    getLatest() {
        return this.tasks[0];
    }

    sort() {
        this.tasks.sort((task1: TaskModel, task2: TaskModel) => task2.createdAt - task1.createdAt);
    }
}