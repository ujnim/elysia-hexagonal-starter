export class User {
    constructor(
        public id: string,
        public username: string
    ) { }

    static create(username: string): User {
        return new User(crypto.randomUUID(), username);
    }
}