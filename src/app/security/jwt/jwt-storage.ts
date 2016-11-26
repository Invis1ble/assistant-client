import { Jwt } from './jwt';

export abstract class JwtStorage {

    abstract hasToken(): boolean;
    abstract getToken(): Jwt | null;
    abstract setToken(jwt: Jwt): void;
    abstract removeToken(): void;

}
