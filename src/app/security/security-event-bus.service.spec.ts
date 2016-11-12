/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SecurityEventBusService } from './security-event-bus.service';

describe('Service: SecurityEventBus', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SecurityEventBusService]
        });
    });

    it('should ...', inject([SecurityEventBusService], (service: SecurityEventBusService) => {
        expect(service).toBeTruthy();
    }));
});
