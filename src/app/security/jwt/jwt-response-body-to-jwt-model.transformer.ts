import { Injectable } from '@angular/core';

import { JwtModel } from './jwt.model';
import { JwtResponseBody } from './jwt.response-body';

@Injectable()
export class JwtResponseBodyToJwtModelTransformer {

    transform(data: JwtResponseBody): JwtModel {
        return new JwtModel(data.token, data.refresh_token, data.data);
    }

}