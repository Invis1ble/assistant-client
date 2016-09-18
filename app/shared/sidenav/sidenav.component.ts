import { Component } from '@angular/core';

import { SidenavItem } from '../sidenav-item';

@Component({
    selector: 'assistant-sidenav',
    templateUrl: 'app/shared/sidenav/sidenav.component.html',
    styleUrls: [
        'app/shared/sidenav/sidenav.component.css'
    ]
})
export class SidenavComponent {
    items: SidenavItem[] = [];

    constructor() {
        this.items.push(
            { title: 'Item1' },
            { title: 'Item2' },
            { title: 'Item3' },
            { title: 'Item4' }
        );
    }
}
