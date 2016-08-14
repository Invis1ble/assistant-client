import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Rx";
import 'rxjs/add/observable/interval';
import * as moment from 'moment';

import { TaskModel } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
    selector: 'assistant-task-list-item',
    templateUrl: 'app/tasks/task-list-item/task-list-item.component.html',
    styleUrls: [
        'app/tasks/task-list-item/task-list-item.component.css'
    ]
})
export class TaskListItemComponent implements OnInit {
    @Input() task: TaskModel;
    @Output() onTaskEdit = new EventEmitter<TaskModel>();
    revenue: string;
    totalTimeSpent: moment.Duration;

    private timer = Observable.interval(1000);
    private timerSubscription: Subscription;
    
    constructor(
        private taskService: TaskService
    ) {
        
    }

    editTask() {
        this.onTaskEdit.emit(this.task);
    }

    deleteTask() {

    }

    ngOnInit() {
        this.setTotalTimeSpent();
        this.setRevenue();

        if (this.task.isActive) {
            this.activateRecalculation();
        }
    }

    toggleRun() {
        this.taskService
            .toggleRun(this.task)
            .subscribe((task: TaskModel) => {
                if (task.isActive) {
                    this.activateRecalculation();
                } else {
                    this.deactivateRecalculation();
                }
            });
    }

    private activateRecalculation() {
        this.timerSubscription = this.timer.subscribe(
            (i) => {
                this.setTotalTimeSpent();
                this.setRevenue();
            }
        );
    }

    private deactivateRecalculation() {
        this.timerSubscription.unsubscribe();
    }
    
    private setRevenue() {
        this.revenue = this.task.revenue.toFixed(2);
    }

    private setTotalTimeSpent() {
        this.totalTimeSpent = moment.duration(this.task.totalTimeSpent);
    }
}