import { AuthHttp } from 'angular2-jwt';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';

import { APP_CONFIG, AppConfig } from '../../app-config';
import { AbstractService } from '../../shared/abstract.service';
import { TaskService } from '../../tasks/shared/task.service';
import { UserModel } from './user.model';
import { NewUserModel } from './new-user.model';
import { JwtModel } from './jwt.model';
import { JwtService } from './jwt.service';
import { CredentialsModel } from './credentials.model';

@Injectable()
export class UserService extends AbstractService {
    constructor(
        private authHttp: AuthHttp,
        @Inject(APP_CONFIG) private config: AppConfig,
        private http: Http,
        private taskService: TaskService,
        private jwtService: JwtService
    ) {
        super();
    }

    getUser(url: string): Observable<UserModel> {
        return this.authHttp.get(url)
            .map(this.extractData)
            .switchMap((data) => this.hydrateData([data]))
            .map((data) => data[0])
            .catch(this.handleError);
    }

    registerUser(user: NewUserModel): Observable<JwtModel> {
        return this.http
            .post(this.config.apiEndpoint.href.replace('/{id}', ''), user)
            .mergeMap((): Observable<JwtModel> => {
                let credentials = new CredentialsModel();

                credentials.username = user.username;
                credentials.password = user.plainPassword.first;

                return this.jwtService.getToken(credentials);
            })
            .catch(this.handleError);
    }

    saveUser(user: UserModel): Observable<UserModel> {
        return this.patch(user, this.config.apiEndpoint.href.replace('/{id}', ''));
    }

    private createModel(data: UserModel) {
        let userModel = new UserModel();

        [
            'id',
            'username',
            'createdAt',
            'tasks',
        ].forEach((propertyName) => {
            userModel[propertyName] = data[propertyName];
        });

        return userModel;
    }

    private extractData(response: Response) {
        return response.json();
    }

    private extractLocation(response: Response): string {
        return response.headers.get('Location');
    }

    private hydrateData(dataset: any[]) {
        return Observable.from(dataset)
            .mergeMap((data: any) => {
                return this.taskService
                    .getTasks(data._links.tasks.href)
                    .map((tasks) => {
                        data.tasks = tasks;
                        return data;
                    });
            })
            .map(this.createModel)
            .toArray();
    }

    private patch(user: UserModel, url: string): Observable<UserModel> {
        return this.authHttp
            .patch(url, JSON.stringify({
                username: user.username
            }))
            .map(this.extractLocation)
            .mergeMap((url) => this.getUser(url))
            .catch(this.handleError);
    }
}
