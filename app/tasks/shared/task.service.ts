import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';

import { APP_CONFIG, AppConfig } from '../../app-config';
import { AbstractService } from '../../shared/abstract.service';
import { PeriodModel } from './period.model';
import { PeriodService } from './period.service';
import { TaskCollection } from './task.collection';
import { TaskModel } from './task.model';

@Injectable()
export class TaskService extends AbstractService {
    constructor(
        @Inject(APP_CONFIG) private config: AppConfig,
        private http: Http,
        private periodService: PeriodService
    ) {

    }

    getTask(url: string): Observable<TaskModel> {
        return this.http.get(url)
            .map(this.extractData)
            .switchMap((data) => this.hydrateData([data]))
            .map((data) => data[0])
            .catch(this.handleError);
    }
    
    getTasks(): Observable<TaskCollection> {
        return this.http.get(this.config.apiEndpoint)
            .map(this.extractData)
            .switchMap((data) => this.hydrateData(data.entities), this.createCollection)
            .catch(this.handleError);
    }

    save(task: TaskModel): Observable<TaskModel> {
        if (task.id) {
            // return this.patch();
        }

        return this.post(task);
    }

    toggleRun(task: TaskModel): Observable<TaskModel> {
        if (task.isActive) {
            let period = task.periods.getLatest();

            period.finishedAt = Date.now();
            
            return this.periodService.save(period, task.periods.getEntityUrl(period))
                .map((period: PeriodModel) => {
                    return task;
                });
        }
        
        return this.periodService.save(new PeriodModel(null, Date.now(), null), task.periods.getSelfUrl())
            .map((period: PeriodModel) => {
                task.periods.add(period);
                return task;
            });
    }

    private createCollection(data: any, tasks: TaskModel[]) {
        // return new TaskCollection(tasks, data._links);
        return new TaskCollection(tasks);
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

    private post(task: TaskModel): Observable<TaskModel> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.config.apiEndpoint, JSON.stringify({
                title: task.title,
                description: task.description,
                rate: task.rate
            }), {
                headers: headers
            })
            .map(this.extractLocation)
            .mergeMap((url) => this.getTask(url))
            .catch(this.handleError);
    }
}
