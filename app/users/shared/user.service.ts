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

import 'rxjs/add/operator/do';

import { APP_CONFIG, AppConfig } from '../../app-config';
import { AbstractService } from '../../shared/abstract.service';
import { TaskService } from '../../tasks/shared/task.service';
import { UserModel } from './user.model';

@Injectable()
export class UserService extends AbstractService {
    constructor(
        private authHttp: AuthHttp,
        @Inject(APP_CONFIG) private config: AppConfig,
        private http: Http,
        private taskService: TaskService
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

    saveUser(user: UserModel): Observable<UserModel> {
        if (user.id) {
            return this.patch(user, this.config.apiEndpoint.href.replace('/{id}', ''));
        }

        return this.post(
            <UserModel & { passwordConfirmation: string }>user,
            this.config.apiEndpoint.href.replace('/{id}', '')
        );
    }

    private createModel(data: any) {
        let userModel = new UserModel();

        userModel.id = data.id;
        userModel.username = data.username;
        userModel.createdAt = data.createdAt;
        userModel.tasks = data.tasks;

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

    private post(user: UserModel & { passwordConfirmation: string }, url: string): Observable<UserModel> {
        return this.http
            .post(url, JSON.stringify({
                username: user.username,
                password: user.password,
                passwordConfirmation: user.passwordConfirmation
            }))
            .map(this.extractLocation)
            .mergeMap((url) => this.getUser(url))
            .catch(this.handleError);
    }
}
