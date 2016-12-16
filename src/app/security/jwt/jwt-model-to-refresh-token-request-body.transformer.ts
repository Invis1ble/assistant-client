import { Injectable } from '@angular/core';

import { Transformer } from 'ng2-rest-service';

import { JwtModel } from './jwt.model';
import { RefreshTokenRequestBody } from './refresh-token.request-body';

@Injectable()
export class JwtModelToRefreshTokenRequestBodyTransformer implements Transformer<JwtModel, RefreshTokenRequestBody> {

    transform(jwt: JwtModel): RefreshTokenRequestBody {
        return {
            refresh_token: jwt.refreshToken
        };
    }

}