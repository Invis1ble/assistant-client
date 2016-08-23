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

@Injectable()
export class TaskService extends AbstractService {
    constructor(
        private authHttp: AuthHttp,
        private periodService: PeriodService
    ) {
        super();
    }

    getTask(url: string): Observable<TaskModel> {
        return this.authHttp.get(url)
            .map(this.extractData)
            .switchMap((data) => this.hydrateData([data]))
            .map((data) => data[0])
            .catch(this.handleError);
    }
    
    getTasks(url: string): Observable<UserTaskCollection> {
        return this.authHttp.get(url)
            .map(this.extractData)
            .switchMap((data) => this.hydrateData(data.entities), this.createCollection)
            .catch(this.handleError);
    }

    saveTask(task: TaskModel, url: string): Observable<TaskModel> {
        if (task.id) {
            return this.patch(task, url);
        }

        return this.post(task, url);
    }

    toggleRun(task: TaskModel): Observable<TaskModel> {
        if (task.isActive) {
            let period = <PeriodModel>task.periods.getLatest();

            period.finishedAt = Date.now();
            
            return this.periodService.savePeriod(period, task.periods.getUrl(period))
                .map((period: PeriodModel) => {
                    return task;
                });
        }
        
        return this.periodService.savePeriod(new PeriodModel(null, Date.now(), null), task.periods.getUrl())
            .map((period: PeriodModel) => {
                task.periods.add(period);
                return task;
            });
    }

    private createCollection(data: any, tasks: TaskModel[]) {
        let userTaskCollection = new UserTaskCollection(tasks);

        userTaskCollection.setLinks(data._links);

        return userTaskCollection;
    }

    private createModel(data: any) {
        let taskModel = new TaskModel();

        taskModel.id = data.id;
        taskModel.title = data.title;
        taskModel.description = data.description;
        taskModel.rate = data.rate;
        taskModel.createdAt = data.createdAt;
        taskModel.periods = data.periods;

        return taskModel;
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
                return this.periodService
                    .getPeriods(data._links.periods.href)
                    .map((periods) => {
                        data.periods = periods;
                        return data;
                    });
            })
            .map(this.createModel)
            .toArray();
    }

    private patch(task: TaskModel, url: string): Observable<TaskModel> {
        return this.authHttp
            .patch(url, JSON.stringify({
                title: task.title,
                description: task.description,
                rate: task.rate
            }))
            .map(this.extractLocation)
            .mergeMap((url) => this.getTask(url))
            .catch(this.handleError);
    }

    private post(task: TaskModel, url: string): Observable<TaskModel> {
        return this.authHttp
            .post(url, JSON.stringify({
                title: task.title,
                description: task.description,
                rate: task.rate
            }))
            .map(this.extractLocation)
            .mergeMap((url) => this.getTask(url))
            .catch(this.handleError);
    }
}
