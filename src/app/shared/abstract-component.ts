import { Response } from '@angular/http';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { isPresent } from '../facade/lang';

export abstract class AbstractComponent {
    constructor(
        private snackBar: MdSnackBar
    ) {

    }

    protected handleError(response: Response): void {
        const data = response.json();

        let message: string;

        if (isPresent(data.error)) {
            message = `${data.error.code} ${data.error.message}.`;
        } else {
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