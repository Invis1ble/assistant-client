import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MdButtonModule, MdDialogModule } from '@angular/material';

import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogService } from './confirm-dialog.service';

@NgModule({
    imports: [
        CommonModule,
        MdButtonModule,
        MdDialogModule.forRoot()
    ],
    providers: [
        ConfirmDialogService
    ],
    entryComponents: [
        ConfirmDialogComponent
    ],
    declarations: [
        ConfirmDialogComponent
    ]
})
export class ConfirmDialogModule {



}
