/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskModelToCreateTaskRequestBodyTransformer } from './task-model-to-create-task-request-body.transformer';

describe('TaskModelToCreateTaskRequestBodyTransformer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskModelToCreateTaskRequestBodyTransformer]
        });
    });

    it('should ...', inject([TaskModelToCreateTaskRequestBodyTransformer], (service: TaskModelToCreateTaskRequestBodyTransformer) => {
        expect(service).toBeTruthy();
    }));
});
