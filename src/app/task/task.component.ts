import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Response } from '@angular/http';

import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import * as moment from 'moment';

import { AbstractComponent } from '../shared/abstract-component';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';
import { TaskModel } from './task.model';
import { TaskService } from './task.service';
import { isPresent } from '../facade/lang';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent extends AbstractComponent implements OnInit, OnDestroy {

    @Output() onTaskEdit = new EventEmitter<TaskModel>();
    @Output() onTaskDeleted = new EventEmitter<TaskModel>();

    @Input() task: TaskModel;

    revenue: string;
    totalTimeSpent: moment.Duration;

    private timer = Observable.interval(1000);
    private timerSubscription: Subscription;

    constructor(
        snackBar: MdSnackBar,
        private taskService: TaskService,
        private confirmDialog: ConfirmDialogService
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
            (task: TaskModel) => {
                if (task.isActive()) {
                    this.activateRecalculation();
                } else {
                    this.deactivateRecalculation();
                }
            },
            (error: any): void => {
                this.handleError(error);
            }
        );
    }

    editTask(): void {
        this.onTaskEdit.emit(this.task);
    }

    deleteTask(): void {
        this.confirmDialog.confirm('Подтверждение', 'Вы уверены, что хотите удалить задачу?')
            .filter((confirmed: boolean) => confirmed)
            .mergeMap((): Observable<Response> => {
                return this.taskService.deleteTask(this.task);
            })
            .subscribe(
                (response: Response) => {
                    this.onTaskDeleted.emit(this.task);
                },
                (error: any): void => {
                    this.handleError(error);
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
