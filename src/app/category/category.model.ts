import { IdAware } from '../shared/id-aware';
import { TaskCollection } from '../task/task.collection';

export class CategoryModel implements IdAware {

    constructor(
        public id: string,
        public name: string,
        public description: string,
        public rate: number,
        public tasks: TaskCollection
    ) {

    }

}
