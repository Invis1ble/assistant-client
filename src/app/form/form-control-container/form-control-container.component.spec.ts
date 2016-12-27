/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormControlContainerComponent } from './form-control-container.component';

describe('FormControlContainerComponent', () => {
    let component: FormControlContainerComponent;
    let fixture: ComponentFixture<FormControlContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormControlContainerComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FormControlContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
