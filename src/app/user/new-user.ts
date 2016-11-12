export class NewUser {

    constructor(
        public username: string,
        public plainPassword: {
            first: string,
            second: string
        }
    ) {

    }

}