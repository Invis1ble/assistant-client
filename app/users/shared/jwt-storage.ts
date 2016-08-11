import { JwtModel } from './jwt.model';

export abstract class JwtStorage {
    abstract getToken(): string;
    abstract setToken(jwt: JwtModel);
}