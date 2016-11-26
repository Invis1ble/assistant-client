export class Jwt {

    constructor(
        public token: string,
        public refreshToken: string,
        public data: any
    ) {

    }

}
