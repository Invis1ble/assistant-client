import { Component } from '@angular/core';

import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-confirm-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

    title: string;
    content: string;

    constructor(
        private dialogRef: MdDialogRef<ConfirmDialogComponent>
    ) {

    }

    confirm(): void {
        this.dialogRef.close(true);
    }

}
