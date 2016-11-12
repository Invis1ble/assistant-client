import { Injectable } from '@angular/core';

import { Jwt } from './jwt';
import { JwtRaw } from './jwt-raw';

@Injectable()
export class JwtHydratorService {

    hydrate(data: JwtRaw): Jwt {
        return new Jwt(data.token, data.data);
    }

}
