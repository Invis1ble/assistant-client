import { Inject, Injectable, forwardRef } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Transformer } from 'ng2-rest-service';

import { PeriodModel } from './period.model';
import { PeriodService } from './period.service';

@Injectable()
export class PeriodLocationToPeriodModelTransformer implements Transformer<Response, Observable<PeriodModel>> {

    constructor(
        @Inject(forwardRef(() => PeriodService)) // circular dependency workaround
        private periodService: PeriodService
    ) {

    }

    transform(response: Response): Observable<PeriodModel> {
        const segments = response.headers.get('Location').split('/');

        return this.periodService.getPeriodById(segments[segments.length - 1]);
    }

}