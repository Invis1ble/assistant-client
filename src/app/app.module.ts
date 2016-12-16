import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdIconRegistry,
    MdListModule,
    MdMenuModule,
    MdProgressCircleModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdToolbarModule
} from '@angular/material';
import { RestModule } from 'ng2-rest-service';

import { AppComponent } from './app.component';
import { CONFIG } from './config/config-token';
import { CONFIG_DEV } from './config/config.dev';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { JwtLocalStorageService } from './security/jwt/jwt-local-storage.service';
import { JwtStorage } from './security/jwt/jwt-storage';
import { FormModule } from './form/form.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RoutingModule } from './routing/routing.module';
import { SecurityModule } from './security/security.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { TaskFormModule } from './task-form/task-form.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegistrationComponent,
        TaskListComponent
    ],
    imports: [
        BrowserModule,
        ConfirmDialogModule,
        FormModule,
        FormsModule,
        MdButtonModule.forRoot(),
        MdCardModule.forRoot(),
        MdIconModule.forRoot(),
        MdListModule.forRoot(),
        MdMenuModule.forRoot(),
        MdProgressCircleModule.forRoot(),
        MdSidenavModule.forRoot(),
        MdSnackBarModule.forRoot(),
        MdToolbarModule.forRoot(),
        RestModule.forRoot(),
        RoutingModule,
        SecurityModule,
        SidenavModule,
        TaskFormModule,
        TaskModule,
        UserModule
    ],
    providers: [
        { provide: CONFIG, useValue: CONFIG_DEV },
        { provide: JwtStorage, useClass: JwtLocalStorageService }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(
        mdIconRegistry: MdIconRegistry
    ) {
        mdIconRegistry.setDefaultFontSetClass('mdi');
    }

}
