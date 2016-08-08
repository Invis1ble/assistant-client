import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { AbstractService } from '../../shared/abstract.service';
import { PeriodModel } from './period.model';
import { TaskPeriodCollection } from './task-period.collection';

@Injectable()
export class PeriodService extends AbstractService {
    constructor(
        private http: Http
    ) {
        
    }

    getPeriod(url: string): Observable<PeriodModel> {
        return this.http.get(url)
            .map(this.extractData)
            .map(this.createModel)
            .catch(this.handleError);
    }
    
    getPeriods(url: string): Observable<TaskPeriodCollection> {
        return this.http.get(url)
            .map(this.extractData)
            .switchMap((data) => this.hydrateData(data.entities), this.createCollection)
            .catch(this.handleError);
    }

    save(period: PeriodModel, url: string): Observable<PeriodModel> {
        if (period.id) {
            return this.patch(period, url);
        }
        
        return this.post(period, url);
    }

    private createCollection(data: any, periods: PeriodModel[]) {
        let taskPeriodCollection = new TaskPeriodCollection(periods);

        taskPeriodCollection.setLinks(data._links);

        return taskPeriodCollection;
    }

    private createModel(data: any) {
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

    private extractData(response: Response) {
        return response.json();
    }

    private extractLocation(response: Response): string {
        return response.headers.get('Location');
    }

    private hydrateData(dataset: any[]) {
        return Observable.from(dataset)
            .map(this.createModel)
            .toArray();
    }

    private post(period: PeriodModel, url: string): Observable<PeriodModel> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(url, JSON.stringify({
                startedAt: Math.round(period.startedAt / 1000)
            }), {
                headers: headers
            })
            .map(this.extractLocation)
            .mergeMap((url) => this.getPeriod(url))
            .catch(this.handleError);
    }

    private patch(period: PeriodModel, url: string): Observable<PeriodModel> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .patch(url, JSON.stringify({
                finishedAt: Math.round(period.finishedAt / 1000)
            }), {
                headers: headers
            })
            .map(this.extractLocation)
            .mergeMap((url) => this.getPeriod(url))
            .catch(this.handleError);
    }
}