/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecurityEventBus } from './security.event-bus';

describe('Service: SecurityEventBus', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SecurityEventBus]
        });
    });

    it('should ...', inject([SecurityEventBus], (service: SecurityEventBus) => {
        expect(service).toBeTruthy();
    }));
});
