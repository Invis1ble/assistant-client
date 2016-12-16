/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AnonymousGuard } from './anonymous.guard';

describe('Service: AnonymousGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AnonymousGuard]
        });
    });

    it('should ...', inject([AnonymousGuard], (service: AnonymousGuard) => {
        expect(service).toBeTruthy();
    }));
});
