import { SortableCollection } from './sortable.collection';
import { TaskModel } from './task.model';
import { UserTaskLinks } from './user-task-collection.links';

export class UserTaskCollection extends SortableCollection<TaskModel> {
    private links: UserTaskLinks;

    getEntityUrl(task: TaskModel): string {
        return this.links.entity.href.replace('{id}', task.id);
    }

    getLatest() {
        return this.items[0];
    }

    getSelfUrl(): string {
        return this.links.self.href;
    }

    setLinks(links: UserTaskLinks) {
        this.links = links;
    }

    sort() {
        this.items.sort((task1: TaskModel, task2: TaskModel) => task2.createdAt - task1.createdAt);
    }
}