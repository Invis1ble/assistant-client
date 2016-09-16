import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { AbstractService } from '../../shared/abstract.service';
import { PeriodModel } from './period.model';
import { TaskPeriodCollection } from './task-period.collection';

@Injectable()
export class PeriodService extends AbstractService {
    constructor(
        private authHttp: AuthHttp
    ) {
        super();
    }

    getPeriod(url: string): Observable<PeriodModel> {
        return this.get(url)
            .map(this.createModel);
    }
    
    getPeriods(url: string): Observable<TaskPeriodCollection> {
        return this.get(url)
            .switchMap((data) => this.hydrateData(data.entities), this.createCollection);
    }

    savePeriod(period: PeriodModel, url: string): Observable<PeriodModel> {
        if (period.id) {
            return this.patch(period, url);
        }
        
        return this.post(period, url);
    }

    private createCollection(data: any, periods: PeriodModel[]): TaskPeriodCollection {
        let taskPeriodCollection = new TaskPeriodCollection(periods);

        taskPeriodCollection.setLinks(data._links);

        return taskPeriodCollection;
    }

    private createModel(data: any): PeriodModel {
        let finishedAt;

        if (null === data.finishedAt) {
            finishedAt = data.finishedAt;
        } else {
            finishedAt = data.finishedAt * 1000;
        }

        return new PeriodModel(
            data.id,
            data.startedAt * 1000,
            finishedAt
        );
    }

    private extractData(response: Response): any {
        return response.json();
    }

    private extractLocation(response: Response): string {
        return response.headers.get('Location');
    }

    private hydrateData(dataset: any[]): Observable<PeriodModel[]> {
        return Observable.from(dataset)
            .map(this.createModel)
            .toArray();
    }

    private get(url): Observable<any> {
        return this.authHttp.get(url)
            .catch(this.handleError)
            .map(this.extractData);
    }

    private post(period: PeriodModel, url: string): Observable<PeriodModel> {
        return this.authHttp
            .post(url, JSON.stringify({
                startedAt: Math.round(period.startedAt / 1000)
            }))
            .catch(this.handleError)
            .map(this.extractLocation)
            .mergeMap((url) => this.getPeriod(url));
    }

    private patch(period: PeriodModel, url: string): Observable<PeriodModel> {
        return this.authHttp
            .patch(url, JSON.stringify({
                finishedAt: Math.round(period.finishedAt / 1000)
            }))
            .catch(this.handleError)
            .map(this.extractLocation)
            .mergeMap((url) => this.getPeriod(url));
    }
}