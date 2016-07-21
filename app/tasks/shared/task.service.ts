import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toArray';

import { PeriodService } from './period.service';
import { TaskModel } from './task.model';
import { PeriodModel } from './period.model';
import { APP_CONFIG, AppConfig } from '../../app-config';

@Injectable()
export class TaskService {
    constructor(
        @Inject(APP_CONFIG) private config: AppConfig,
        private http: Http,
        private periodService: PeriodService
    ) {

    }

    getTask(url: string): Observable<TaskModel> {
        return this.http.get(url)
            .map(this.extractData)
            // .map(this.createModel)
            .catch(this.handleError);
    }
    
    getTasks(): Observable<TaskModel[]> {
        return this.http.get(this.config.apiEndpoint)
            .map(this.extractData)
            .switchMap((tasks) => this.hydrateData(tasks))
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

    private extractData(response: Response) {
        return response.json().entities;
    }

    private extractLocation(response: Response): string {
        return response.headers.get('Location');
    }

    private hydrateData(tasks: Object[]) {
        return Observable.from(tasks)
            .mergeMap((task: any) => {
                return this.periodService
                    .getPeriods(task._links.periods.href)
                    .map((periods) => {
                        task.periods = periods;
                        return task;
                    });
            })
            .map((task) => {
                let taskModel = new TaskModel();

                taskModel.id = task.id;
                taskModel.title = task.title;
                taskModel.description = task.description;
                taskModel.rate = task.rate;
                taskModel.createdAt = task.createdAt;
                taskModel.periods = task.periods;

                return taskModel;
            })
            .toArray();
    }
    
    private handleError(error: any) {
        let errorMessage;

        if (undefined === error.message) {
            if (undefined === error.status) {
                errorMessage = 'Server Error';
            } else {
                errorMessage = `${error.status} - ${error.statusText}`;
            }
        } else {
            errorMessage = error.message;
        }

        console.error(errorMessage);
        return Observable.throw(errorMessage);
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
