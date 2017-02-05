import { Response } from '@angular/http';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { isPresent } from '../facade/lang';

export abstract class AbstractComponent {
    constructor(
        private snackBar: MdSnackBar
    ) {

    }

    protected handleError(error: any): void {
        let message: string;

        if (error instanceof Response) {
            const data = error.json();

            if (isPresent(data.error)) {
                message = `${data.error.code} ${data.error.message}.`;
            }
        }

        if (!isPresent(message)) {
            message = 'Неизвестная ошибка.';
        }

        this.showMessage(message);
    }

    protected showMessage(message: string, actionLabel?: string): void {
        if (!isPresent(actionLabel)) {
            actionLabel = 'OK';
        }

        this.snackBar.open(message, actionLabel, new MdSnackBarConfig());
    }
}