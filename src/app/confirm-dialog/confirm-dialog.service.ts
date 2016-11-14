import { Injectable } from '@angular/core';

import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable()
export class ConfirmDialogService {

    constructor(
        private dialog: MdDialog
    ) {

    }

    confirm(title: string, content?: string): Observable<boolean> {
        const dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.content = content;

        return dialogRef.afterClosed()
            .map((result: boolean | undefined) => {
                return !!result;
            });
    }

}
