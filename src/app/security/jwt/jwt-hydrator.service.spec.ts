/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JwtHydratorService } from './jwt-hydrator.service';

describe('Service: JwtHydrator', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [JwtHydratorService]
        });
    });

    it('should ...', inject([JwtHydratorService], (service: JwtHydratorService) => {
        expect(service).toBeTruthy();
    }));
});
