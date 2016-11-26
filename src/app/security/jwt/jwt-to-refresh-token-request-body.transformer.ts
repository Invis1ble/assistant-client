import { Injectable } from '@angular/core';

import { Jwt } from './jwt';
import { RefreshTokenRequestBody } from './refresh-token.request-body';

@Injectable()
export class JwtToRefreshTokenRequestBodyTransformer {

    transform(jwt: Jwt): RefreshTokenRequestBody {
        return {
            refresh_token: jwt.refreshToken
        };
    }

}