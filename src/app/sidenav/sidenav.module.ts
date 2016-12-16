import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MdIconModule, MdListModule } from '@angular/material';

import { SidenavComponent } from './sidenav.component';

@NgModule({
    imports: [
        CommonModule,
        MdIconModule,
        MdListModule,
        RouterModule
    ],
    declarations: [
        SidenavComponent
    ],
    exports: [
        SidenavComponent
    ]
})
export class SidenavModule {



}
