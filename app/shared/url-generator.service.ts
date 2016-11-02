import { Inject, Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { APP_CONFIG, AppConfig } from '../app-config';
import { Link } from '../tasks/shared/link';
import { isPresent } from './facade/lang';

@Injectable()
export class UrlGenerator {
    constructor(
        @Inject(APP_CONFIG) private config: AppConfig
    ) {

    }

    generate(link: Link, params?: Params): string {
        let uri: string;

        if (link.templated) {
            if (!isPresent(params)) {
                throw new Error(`No parameters passed for the templated link with href ${link.href}.`);
            }

            uri = link.href;

            for (let name in params) {
                let token = `{${name}}`;

                if (-1 === uri.indexOf(token)) {
                    throw new Error(`No parameter ${name} in the link with href ${link.href}.`);
                }

                uri = uri.replace(token, params[name]);
            }
        } else {
            uri = link.href;
        }

        return this.config.apiEndpoint.href + uri;
    }
}