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
import { CategoryListModule } from './category-list/category-list.module';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { FormModule } from './form/form.module';
import { JwtLocalStorageService } from './security/jwt/jwt-local-storage.service';
import { JwtStorage } from './security/jwt/jwt-storage';
import { LoginModule } from './login/login.module';
import { RegistrationModule } from './registration/registration.module';
import { RoutingModule } from './routing/routing.module';
import { SecurityModule } from './security/security.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { TaskListModule } from './task-list/task-list.module';
import { UserModule } from './user/user.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CategoryListModule,
        ConfirmDialogModule,
        FormModule,
        FormsModule,
        LoginModule,
        MdButtonModule.forRoot(),
        MdCardModule.forRoot(),
        MdIconModule.forRoot(),
        MdListModule.forRoot(),
        MdMenuModule.forRoot(),
        MdProgressCircleModule.forRoot(),
        MdSidenavModule.forRoot(),
        MdSnackBarModule.forRoot(),
        MdToolbarModule.forRoot(),
        RegistrationModule,
        RestModule.forRoot(),
        RoutingModule,
        SecurityModule,
        SidenavModule,
        TaskListModule,
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
