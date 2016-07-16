import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
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
    
    getTasks(): Observable<TaskModel[]> {
        return this.http.get(this.config.apiEndpoint)
            .map(this.extractData)
            .switchMap((tasks) => this.hydrateData(tasks))
            .catch(this.handleError);
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
                return new TaskModel(
                    task.id,
                    task.title,
                    task.description,
                    task.rate,
                    task.createdAt,
                    task.periods
                );
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
}
