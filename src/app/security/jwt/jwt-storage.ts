import { Jwt } from './jwt';

export abstract class JwtStorage {

    abstract getToken(): Jwt;
    abstract setToken(jwt: Jwt): void;
    abstract removeToken(): void;

}
