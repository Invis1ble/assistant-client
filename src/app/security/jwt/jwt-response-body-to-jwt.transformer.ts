import { Injectable } from '@angular/core';

import { Jwt } from './jwt';
import { JwtResponseBody } from './jwt.response-body';

@Injectable()
export class JwtResponseBodyToJwtTransformer {

    transform(data: JwtResponseBody): Jwt {
        return new Jwt(data.token, data.refresh_token, data.data);
    }

}