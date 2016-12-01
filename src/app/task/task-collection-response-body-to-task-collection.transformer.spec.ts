/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskCollectionResponseBodyToTaskCollectionTransformer } from './task-collection-response-body-to-task-collection.transformer';

describe('TaskCollectionResponseBodyToTaskCollectionTransformer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TaskCollectionResponseBodyToTaskCollectionTransformer]
        });
    });

    it('should ...', inject([TaskCollectionResponseBodyToTaskCollectionTransformer], (service: TaskCollectionResponseBodyToTaskCollectionTransformer) => {
        expect(service).toBeTruthy();
    }));
});
