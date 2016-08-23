import { AbstractModel } from './abstract.model';

export class PeriodModel extends AbstractModel {
    constructor(
        public id: string,
        public startedAt: number,
        public finishedAt: number
    ) {
        super();
    }

    get isActive(): boolean {
        return null === this.finishedAt;
    }
    
    get duration(): number {
        let finishedAt;
        
        if (this.isActive) {
            finishedAt = Date.now();
        } else {
            finishedAt = this.finishedAt;
        }
        
        return finishedAt - this.startedAt;
    }
}