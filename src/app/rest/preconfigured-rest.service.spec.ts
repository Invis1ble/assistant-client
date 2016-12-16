/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PreconfiguredRestService } from './preconfigured-rest.service';

describe('PreconfiguredRestService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PreconfiguredRestService]
        });
    });

    it('should ...', inject([PreconfiguredRestService], (service: PreconfiguredRestService) => {
        expect(service).toBeTruthy();
    }));
});
