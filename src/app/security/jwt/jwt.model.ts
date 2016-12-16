export class JwtModel {

    constructor(
        public token: string,
        public refreshToken: string,
        public data: any
    ) {

    }

}
