export class User {

    constructor(
        public id: string,
        public username: string,
        public plainPassword: string,
        public createdAt: Date
    ) {

    }

}