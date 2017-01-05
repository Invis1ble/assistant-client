import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { TaskCollection } from './task.collection';
import { TaskModel } from './task.model';

@Injectable()
export class TaskEventBus {

    tasksLoaded$ = new ReplaySubject<TaskCollection>(1);
    taskSaved$ = new ReplaySubject<TaskModel>();
    taskCreated$ = new ReplaySubject<TaskModel>();
    taskUpdated$ = new ReplaySubject<TaskModel>();
    taskDeleted$ = new ReplaySubject<TaskModel>();

}
