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
import { PeriodModel } from './period.model';
import { PeriodService } from './period.service';
import { TaskModel } from './task.model';
import { UserTaskCollection } from './user-task.collection';
import { UrlGenerator } from '../../shared/url-generator.service';
import { isPresent } from '../../shared/facade/lang';

@Injectable()
export class TaskService extends AbstractService {
    private endpoint = '/api/tasks';

    constructor(
        private authHttp: AuthHttp,
        private periodService: PeriodService,
        private urlGenerator: UrlGenerator
    ) {
        super();
    }

    getTask(url: string): Observable<TaskModel> {
        return this.get(url)
            .switchMap((data) => this.hydrateData([data]))
            .map((data) => data[0]);
    }
    
    getTasks(url: string): Observable<UserTaskCollection> {
        return this.get(url)
            .switchMap((data) => this.hydrateData(data.entities), this.createCollection);
    }

    saveTask(task: TaskModel, url: string): Observable<TaskModel> {
        if (task.id) {
            return this.patch(task, url);
        }

        return this.post(task, url);
    }

    deleteTask(task: TaskModel): Observable<TaskModel> {
        return this.delete(this.getUrl(task))
            .map(() => task);
    }

    toggleRun(task: TaskModel): Observable<TaskModel> {
        if (task.isActive) {
            let period = <PeriodModel>task.periods.getLatest();

            period.finishedAt = Date.now();
            
            return this.periodService
                .savePeriod(period, this.urlGenerator.generate(task.periods.getLink(period), {id: period.id}))
                .map((period: PeriodModel) => {
                    return task;
                });
        }
        
        return this.periodService
            .savePeriod(new PeriodModel(null, Date.now(), null), this.urlGenerator.generate(task.periods.getLink()))
            .map((period: PeriodModel) => {
                task.periods.add(period);
                return task;
            });
    }

    private createCollection(data: any, tasks: TaskModel[]): UserTaskCollection {
        let userTaskCollection = new UserTaskCollection(tasks);

        userTaskCollection.setLinks(data._links);

        return userTaskCollection;
    }

    private createModel(data: any): TaskModel {
        let taskModel = new TaskModel();

        taskModel.id = data.id;
        taskModel.title = data.title;
        taskModel.description = data.description;
        taskModel.rate = data.rate;
        taskModel.createdAt = data.createdAt;
        taskModel.periods = data.periods;

        return taskModel;
    }

    private extractData(response: Response): any {
        return response.json();
    }

    private extractLocation(response: Response): string {
        return response.headers.get('Location');
    }

    private hydrateData(dataset: any[]): Observable<TaskModel[]> {
        return Observable.from(dataset)
            .mergeMap((data: any) => {
                return this.periodService
                    .getPeriods(this.urlGenerator.generate(data._links.periods))
                    .map((periods) => {
                        data.periods = periods;
                        return data;
                    });
            })
            .map(this.createModel)
            .toArray();
    }

    getUrl(task: {id?: string}): string {
        if (isPresent(task.id)) {
            return this.urlGenerator.generate({href: `${this.endpoint}/{id}`, templated: true}, {id: task.id});
        }

        return this.urlGenerator.generate({href: this.endpoint});
    }

    private get(url): Observable<any> {
        return this.authHttp.get(url)
            .catch(this.handleError)
            .map(this.extractData);
    }

    private patch(task: TaskModel, url: string): Observable<TaskModel> {
        return this.authHttp
            .patch(url, JSON.stringify({
                title: task.title,
                description: task.description,
                rate: task.rate
            }))
            .catch(this.handleError)
            .map(this.extractLocation)
            .mergeMap((url) => this.getTask(url));
    }

    private post(task: TaskModel, url: string): Observable<TaskModel> {
        return this.authHttp
            .post(url, JSON.stringify({
                title: task.title,
                description: task.description,
                rate: task.rate
            }))
            .catch(this.handleError)
            .map(this.extractLocation)
            .mergeMap((url) => this.getTask(url));
    }

    private delete(url: string): Observable<Response> {
        return this.authHttp
            .delete(url)
            .catch(this.handleError);
    }
}
