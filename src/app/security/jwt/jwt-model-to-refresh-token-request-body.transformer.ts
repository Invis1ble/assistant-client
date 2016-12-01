import { Injectable } from '@angular/core';

import { JwtModel } from './jwt.model';
import { RefreshTokenRequestBody } from './refresh-token.request-body';

@Injectable()
export class JwtModelToRefreshTokenRequestBodyTransformer {

    transform(jwt: JwtModel): RefreshTokenRequestBody {
        return {
            refresh_token: jwt.refreshToken
        };
    }

}