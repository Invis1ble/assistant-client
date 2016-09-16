import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';

import { AbstractService } from '../../shared/abstract.service';
import { TaskService } from '../../tasks/shared/task.service';
import { UserModel } from './user.model';
import { NewUserModel } from './new-user.model';
import { JwtModel } from './jwt.model';
import { JwtService } from './jwt.service';
import { CredentialsModel } from './credentials.model';
import { UrlGenerator } from '../../shared/url-generator.service';
import { UserTaskCollection } from '../../tasks/shared/user-task.collection';
import { isPresent } from '../../shared/facade/lang';

@Injectable()
export class UserService extends AbstractService {
    private endpoint = '/api/users';

    constructor(
        private authHttp: AuthHttp,
        private http: Http,
        private taskService: TaskService,
        private jwtService: JwtService,
        private urlGenerator: UrlGenerator
    ) {
        super();
    }

    getUser(url: string): Observable<UserModel> {
        return this.get(url)
            .switchMap((data) => this.hydrateData([data]))
            .map((data) => data[0]);
    }

    registerUser(user: NewUserModel, url: string): Observable<JwtModel> {
        return this.post(user, url);
    }

    saveUser(user: UserModel, url: string): Observable<UserModel> {
        return this.patch(user, url);
    }

    getUrl(user: {id?: string}): string {
        if (isPresent(user.id)) {
            return this.urlGenerator.generate({href: `${this.endpoint}/{id}`, templated: true}, {id: user.id});
        }

        return this.urlGenerator.generate({href: this.endpoint});
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

    private extractData(response: Response): any {
        return response.json();
    }

    private extractLocation(response: Response): string {
        return response.headers.get('Location');
    }

    private hydrateData(dataset: any[]): Observable<UserModel[]> {
        return Observable.from(dataset)
            .mergeMap((data: any) => {
                return this.taskService
                    .getTasks(this.urlGenerator.generate(data._links.tasks))
                    .map((tasks: UserTaskCollection) => {
                        data.tasks = tasks;
                        return data;
                    });
            })
            .map(this.createModel)
            .toArray();
    }

    private get(url: string): Observable<any> {
        return this.authHttp.get(url)
            .catch(this.handleError)
            .map(this.extractData);
    }

    private post(user: NewUserModel, url: string): Observable<JwtModel> {
        return this.http
            .post(url, user)
            .catch(this.handleError)
            .mergeMap((): Observable<JwtModel> => {
                let credentials = new CredentialsModel();

                credentials.username = user.username;
                credentials.password = user.plainPassword.first;

                return this.jwtService.getToken(credentials, this.jwtService.getUrl());
            });
    }

    private patch(user: UserModel, url: string): Observable<UserModel> {
        return this.authHttp
            .patch(url, JSON.stringify({
                username: user.username
            }))
            .catch(this.handleError)
            .map(this.extractLocation)
            .mergeMap((url: string) => this.getUser(url));
    }
}
