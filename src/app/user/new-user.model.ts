export class NewUserModel {

    constructor(
        public username: string,
        public plainPassword: {
            first: string,
            second: string
        }
    ) {

    }

}