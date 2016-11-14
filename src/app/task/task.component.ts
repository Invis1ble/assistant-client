import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Response } from '@angular/http';

import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import * as moment from 'moment';

import { AbstractComponent } from '../shared/abstract-component';
import { Task } from './task';
import { TaskService } from './task.service';
import { isPresent } from '../facade/lang';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent extends AbstractComponent implements OnInit, OnDestroy {

    @Output() onTaskEdit = new EventEmitter<Task>();
    @Output() onTaskDeleted = new EventEmitter<Task>();

    @Input() task: Task;

    revenue: string;
    totalTimeSpent: moment.Duration;

    private timer = Observable.interval(1000);
    private timerSubscription: Subscription;

    constructor(
        snackBar: MdSnackBar,
        private taskService: TaskService
    ) {
        super(snackBar);
    }

    ngOnInit(): void {
        this.setTotalTimeSpent();
        this.setRevenue();

        if (this.task.isActive()) {
            this.activateRecalculation();
        }
    }

    toggleRun(): void {
        this.taskService.toggleRun(this.task).subscribe(
            (task: Task) => {
                if (task.isActive()) {
                    this.activateRecalculation();
                } else {
                    this.deactivateRecalculation();
                }
            },
            (response: Response): void => {
                this.handleError(response);
            }
        );
    }

    editTask(): void {
        this.onTaskEdit.emit(this.task);
    }

    deleteTask(): void {
        // TODO: move to @angular2-material/dialog
        if (!confirm('Вы уверены?')) {
            return;
        }

        this.taskService.deleteTask(this.task).subscribe(
            (task: Task) => {
                this.onTaskDeleted.emit(task);
            },
            (response: Response): void => {
                this.handleError(response);
            }
        );
    }

    private activateRecalculation() {
        this.timerSubscription = this.timer.subscribe(
            () => {
                this.setTotalTimeSpent();
                this.setRevenue();
            }
        );
    }

    private deactivateRecalculation() {
        if (isPresent(this.timerSubscription)) {
            this.timerSubscription.unsubscribe();
        }
    }

    private setRevenue() {
        this.revenue = this.task.getRevenue().toFixed(2);
    }

    private setTotalTimeSpent() {
        this.totalTimeSpent = moment.duration(this.task.getTotalTimeSpent());
    }

    ngOnDestroy(): void {
        this.deactivateRecalculation();
    }

}
