/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskResponseBodyToTaskModelTransformer } from './task-response-body-to-task-model.transformer';

describe('TaskResponseBodyToTaskModelTransformer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskResponseBodyToTaskModelTransformer]
        });
    });

    it('should ...', inject([TaskResponseBodyToTaskModelTransformer], (service: TaskResponseBodyToTaskModelTransformer) => {
        expect(service).toBeTruthy();
    }));
});
