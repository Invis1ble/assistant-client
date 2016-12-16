import { Inject, Injectable, forwardRef } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Transformer } from 'ng2-rest-service';

import { TaskService } from './task.service';
import { TaskModel } from './task.model';

@Injectable()
export class TaskLocationToTaskModelTransformer implements Transformer<Response, Observable<TaskModel>> {

    constructor(
        @Inject(forwardRef(() => TaskService)) // circular dependency workaround
        private taskService: TaskService
    ) {

    }

    transform(response: Response): Observable<TaskModel> {
        const segments = response.headers.get('Location').split('/');

        return this.taskService.getTaskById(segments[segments.length - 1]);
    }

}