import { Component, OnInit } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';

import { UserTaskCollection } from '../shared/user-task.collection';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListItemComponent } from '../task-list-item/task-list-item.component';
import { TaskModel } from '../shared/task.model';
import { TaskService } from '../shared/task.service';
import { UserModel } from '../../users/shared/user.model';
import { UserService } from '../../users/shared/user.service';

@Component({
    selector: 'assistant-task-list',
    templateUrl: 'app/tasks/task-list/task-list.component.html',
    styleUrls: [
        'app/tasks/task-list/task-list.component.css'
    ],
    directives: [
        MD_BUTTON_DIRECTIVES,
        MdIcon,
        TaskFormComponent,
        TaskListItemComponent
    ],
    providers: [
        MdIconRegistry
    ],
})
export class TaskListComponent implements OnInit {
    showingTaskForm = true;
    user: UserModel;

    constructor(
        private userService: UserService
    ) {

    }

    addNewTask() {
        this.showTaskForm();
    }

    getUser() {
        this.userService
            .getUser('http://assistant/app_dev.php/api/users/cf270e76-c3fb-4235-a2af-8f4eacd81635')
            .subscribe(
                (user: UserModel) => {
                    // console.log(user);

                    this.user = user;
                },
                this.handleError
            );
    }

    hideTaskForm() {
        this.showingTaskForm = false;
    }

    ngOnInit() {
        this.getUser();
    }

    onFormCanceled() {
        this.hideTaskForm();
    }

    onTaskSaved(task: TaskModel) {
        this.user.tasks.add(task);
        this.hideTaskForm();
    }

    showTaskForm() {
        this.showingTaskForm = true;
    }

    private handleError() {

    }
}