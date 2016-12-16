/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JwtLocalStorageService } from './jwt-local-storage.service';

describe('Service: JwtLocalStorage', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [JwtLocalStorageService]
        });
    });

    it('should ...', inject([JwtLocalStorageService], (service: JwtLocalStorageService) => {
        expect(service).toBeTruthy();
    }));
});
