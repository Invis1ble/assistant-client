/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskModelToUpdateTaskRequestBodyTransformer } from './task-model-to-update-task-request-body.transformer';

describe('TaskModelToUpdateTaskRequestBodyTransformer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskModelToUpdateTaskRequestBodyTransformer]
        });
    });

    it('should ...', inject([TaskModelToUpdateTaskRequestBodyTransformer], (service: TaskModelToUpdateTaskRequestBodyTransformer) => {
        expect(service).toBeTruthy();
    }));
});
