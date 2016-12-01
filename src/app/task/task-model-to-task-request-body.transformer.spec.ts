/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskModelToTaskRequestBodyTransformer } from './task-model-to-task-request-body.transformer';

describe('TaskModelToTaskRequestBodyTransformer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskModelToTaskRequestBodyTransformer]
        });
    });

    it('should ...', inject([TaskModelToTaskRequestBodyTransformer], (service: TaskModelToTaskRequestBodyTransformer) => {
        expect(service).toBeTruthy();
    }));
});
