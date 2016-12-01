import { Injectable } from '@angular/core';

import { PeriodCollection } from './period.collection';
import { PeriodCollectionResponseBody } from './period-collection.response-body';
import { PeriodResponseBodyToPeriodModelTransformer } from './period-response-body-to-period-model.transformer';

@Injectable()
export class PeriodCollectionResponseBodyToPeriodCollectionTransformer {

    constructor(
        private responseToModelTransformer: PeriodResponseBodyToPeriodModelTransformer
    ) {

    }

    transform(data: PeriodCollectionResponseBody): PeriodCollection {
        return new PeriodCollection(
            data.entities.map(this.responseToModelTransformer.transform, this.responseToModelTransformer)
        );
    }

}
