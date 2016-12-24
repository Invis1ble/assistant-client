/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryEventBus } from './category.event-bus';

describe('CategoryEventBus', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CategoryEventBus]
        });
    });

    it('should ...', inject([CategoryEventBus], (service: CategoryEventBus) => {
        expect(service).toBeTruthy();
    }));
});
