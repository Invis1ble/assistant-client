import { IdAware } from '../../shared/id-aware';

export class TaskPeriod implements IdAware {

    constructor(
        public id: string,
        public startedAt: Date,
        public finishedAt: Date | null
    ) {

    }

    isActive(): boolean {
        return null === this.finishedAt;
    }

    getDuration(): number {
        let finishedAt;

        if (this.isActive()) {
            finishedAt = Date.now();
        } else {
            finishedAt = this.finishedAt.getTime();
        }

        return finishedAt - this.startedAt.getTime();
    }

}
