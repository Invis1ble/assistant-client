import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MdSnackBar } from '@angular/material';

import { AbstractComponent } from '../shared/abstract-component';
import { AuthService } from '../security/auth.service';
import { CategoryCollection } from '../category/category.collection';
import { CategoryEventBus } from '../category/category.event-bus';
import { CategoryModel } from '../category/category.model';
import { CategoryService } from '../category/category.service';
import { SecurityEventBus } from '../security/security.event-bus';
import { SidenavSection, SidenavSectionMap } from './sidenav-section';
import { UserModel } from '../user/user.model';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent extends AbstractComponent implements OnInit, OnDestroy {

    user: UserModel;

    get sections(): SidenavSection[] {
        return Object.keys(this.sectionMap).map((id: string) => {
            return this.sectionMap[id];
        });
    }

    private sectionMap: SidenavSectionMap = {};
    private categories: CategoryCollection;

    constructor(
        snackBar: MdSnackBar,
        private auth: AuthService,
        private categoryService: CategoryService,
        private securityEventBus: SecurityEventBus,
        private categoryEventBus: CategoryEventBus,
        private router: Router
    ) {
        super(snackBar);
    }

    ngOnInit(): void {
        this.setUnauthorizedUserSection();

        this.securityEventBus.userLoggedIn$
            .subscribe((user: UserModel) => {
                this.onUserLoggedIn(user);
            });

        this.securityEventBus.userLoggedOut$
            .subscribe(() => {
                this.onUserLoggedOut();
            });

        this.categoryEventBus.categoriesLoaded$
            .subscribe((categories: CategoryCollection) => {
                this.onCategoriesLoaded(categories);
            });
        
        this.categoryEventBus.categorySaved$
            .subscribe((category: CategoryModel) => {
                this.onCategorySaved(category);
            });
        
        this.categoryEventBus.categoryDeleted$
            .subscribe((category: CategoryModel) => {
                this.onCategoryDeleted(category);
            });
    }

    logout() {
        this.auth.logout();
    }

    ngOnDestroy(): void {
        this.securityEventBus.userLoggedIn$.unsubscribe();
        this.securityEventBus.userLoggedOut$.unsubscribe();
        this.categoryEventBus.categoriesLoaded$.unsubscribe();
        this.categoryEventBus.categorySaved$.unsubscribe();
        this.categoryEventBus.categoryDeleted$.unsubscribe();
    }

    private onUserLoggedIn(user: UserModel): void {
        this.user = user;

        delete this.sectionMap.account;

        this.loadUserCategories(user);
    }

    private onUserLoggedOut(): void {
        this.user = null;
        this.setUnauthorizedUserSection();

        delete this.sectionMap.categories;

        this.router.navigate(['login']);
    }

    private onCategoriesLoaded(categories: CategoryCollection): void {
        this.categories = categories;
        this.syncCategories();
    }
    
    private onCategorySaved(category: CategoryModel): void {
        this.categories.update(category);
        this.syncCategories();
    }
    
    private onCategoryDeleted(category: CategoryModel): void {
        this.categories.delete(category);
        this.syncCategories();
    }

    private setUnauthorizedUserSection(): void {
        this.sectionMap.account = {
            title: 'Аккаунт',
            items: [
                { title: 'Вход', icon: 'mdi-login', routerLink: 'login' },
                { title: 'Регистрация', icon: 'mdi-account-plus', routerLink: 'register' }
            ]
        };
    }
    
    private syncCategories(): void {
        this.sectionMap.categories = {
            title: 'Категории',
            items: this.categories.getItems().map((category: CategoryModel) => {
                return {
                    title: category.name,
                    routerLink: ['/categories', category.id, 'tasks']
                };
            })
        };
    }

    private loadUserCategories(user: UserModel): void {
        this.categoryService.getUserCategories(user)
            .subscribe(
                null,
                (error: any): void => {
                    this.handleError(error);
                }
            );
    }

}
