import { Injectable } from '@angular/core';

import { Transformer } from 'ng2-rest-service';

import { JwtModel } from './jwt.model';
import { JwtResponseBody } from './jwt.response-body';

@Injectable()
export class JwtResponseBodyToJwtModelTransformer implements Transformer<JwtResponseBody, JwtModel> {

    transform(data: JwtResponseBody): JwtModel {
        return new JwtModel(data.token, data.refresh_token, data.data);
    }

}