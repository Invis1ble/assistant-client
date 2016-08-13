import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    selector: 'assistant-app',
    templateUrl: 'app/app.component.html',
    styleUrls: [
        'app/app.component.css'
    ],
    directives: [
        ROUTER_DIRECTIVES
    ]
})
export class AppComponent {
    title = 'Assistant App';
}
