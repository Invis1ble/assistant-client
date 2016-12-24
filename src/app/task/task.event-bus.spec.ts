/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskEventBus } from './task.event-bus';

describe('TaskEventBus', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskEventBus]
        });
    });

    it('should ...', inject([TaskEventBus], (service: TaskEventBus) => {
        expect(service).toBeTruthy();
    }));
});
