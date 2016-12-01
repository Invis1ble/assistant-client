/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserResponseBodyToUserModelTransformer } from './user-response-body-to-user-model.transformer';

describe('UserResponseBodyToUserModelTransformer', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserResponseBodyToUserModelTransformer]
        });
    });

    it('should ...', inject([UserResponseBodyToUserModelTransformer], (service: UserResponseBodyToUserModelTransformer) => {
        expect(service).toBeTruthy();
    }));
});
