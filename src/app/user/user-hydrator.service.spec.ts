/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserHydratorService } from './user-hydrator.service';

describe('Service: UserHydrator', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserHydratorService]
        });
    });

    it('should ...', inject([UserHydratorService], (service: UserHydratorService) => {
        expect(service).toBeTruthy();
    }));
});
