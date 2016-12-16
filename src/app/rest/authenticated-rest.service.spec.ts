/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticatedRestService } from './authenticated-rest.service';

describe('AuthenticatedRestService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthenticatedRestService]
        });
    });

    it('should ...', inject([AuthenticatedRestService], (service: AuthenticatedRestService) => {
        expect(service).toBeTruthy();
    }));
});
