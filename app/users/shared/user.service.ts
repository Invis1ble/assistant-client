import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';

import { AbstractService } from '../../shared/abstract.service';
import { TaskService } from '../../tasks/shared/task.service';
import { UserModel } from './user.model';

@Injectable()
export class UserService extends AbstractService {
    constructor(
        private authHttp: AuthHttp,
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
}
