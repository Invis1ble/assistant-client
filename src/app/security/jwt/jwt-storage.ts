import { JwtModel } from './jwt.model';

export abstract class JwtStorage {

    abstract hasToken(): boolean;
    abstract getToken(): JwtModel | null;
    abstract setToken(jwt: JwtModel): void;
    abstract removeToken(): void;

}
