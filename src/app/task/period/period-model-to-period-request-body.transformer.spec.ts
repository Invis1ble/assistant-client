/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PeriodModelToPeriodRequestBodyTransformer } from './period-model-to-period-request-body.transformer';

describe('PeriodModelToPeriodRequestBodyTransformer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeriodModelToPeriodRequestBodyTransformer]
    });
  });

  it('should ...', inject([PeriodModelToPeriodRequestBodyTransformer], (service: PeriodModelToPeriodRequestBodyTransformer) => {
    expect(service).toBeTruthy();
  }));
});
