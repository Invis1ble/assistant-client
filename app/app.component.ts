import { Component } from '@angular/core';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { PeriodService } from './tasks/shared/period.service';
import { TaskService } from './tasks/shared/task.service';

@Component({
    selector: 'assistant-app',
    templateUrl: 'app/app.component.html',
    styleUrls: [
        'app/app.component.css'
    ],
    directives: [
        MD_TOOLBAR_DIRECTIVES,
        ROUTER_DIRECTIVES
    ],
    providers: [
        PeriodService,
        TaskService
    ]
})
export class AppComponent {
    title = 'Assistant App';
}
