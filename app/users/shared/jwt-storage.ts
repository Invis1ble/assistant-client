import { JwtModel } from './jwt.model';

export abstract class JwtStorage {
    abstract getToken(): JwtModel;
    abstract setToken(jwt: JwtModel);
}