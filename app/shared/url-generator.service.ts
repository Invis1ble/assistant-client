import { Inject, Injectable } from '@angular/core';

import { APP_CONFIG, AppConfig } from '../app-config';
import { Link } from '../tasks/shared/link';
import { isPresent } from './facade/lang';

interface Params {
    [name: string]: string | number
}

@Injectable()
export class UrlGenerator {
    constructor(
        @Inject(APP_CONFIG) private config: AppConfig
    ) {

    }

    generate(link: Link, params?: Params): string {
        let uri;

        if (link.templated) {
            if (!isPresent(params)) {
                throw new Error(`No parameters passed for the templated link with href ${link.href}.`);
            }

            for (let name in params) {
                if (!(new RegExp(`{${name}}`)).test(link.href)) {
                    throw new Error(`No parameter ${name} in the link with href ${link.href}.`);
                }

                uri = link.href.replace(`{${name}}`, `${params[name]}`);
            }
        } else {
            uri = link.href;
        }

        return this.config.apiEndpoint.href + uri;
    }
}