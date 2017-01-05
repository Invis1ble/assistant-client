import { IdAware } from '../shared/id-aware';
import { TaskCollection } from '../task/task.collection';

export class CategoryModel implements IdAware {

    constructor(
        public id: string = null,
        public name: string = '',
        public description: string = '',
        public rate: number = 20,
        public tasks: TaskCollection = new TaskCollection()
    ) {

    }

}
