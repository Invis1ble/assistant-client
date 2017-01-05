import { Component, OnDestroy, OnInit } from '@angular/core';

import { MdDialog, MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

import { AbstractComponent } from '../shared/abstract-component';
import { CategoryCollection } from '../category/category.collection';
import { CategoryEventBus } from '../category/category.event-bus';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { CategoryModel } from '../category/category.model';
import { SecurityEventBus } from '../security/security.event-bus';
import { UserModel } from '../user/user.model';
import { isPresent } from '../facade/lang';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent extends AbstractComponent implements OnInit, OnDestroy {

    categories: CategoryCollection = new CategoryCollection();
    user: UserModel;

    private userLoggedInSubscription: Subscription;
    private categoriesLoadedSubscription: Subscription;
    private categorySavedSubscription: Subscription;
    private categoryDeletedSubscription: Subscription;

    private pending: boolean = true;

    constructor(
        snackBar: MdSnackBar,
        private securityEventBus: SecurityEventBus,
        private categoryEventBus: CategoryEventBus,
        private dialog: MdDialog
    ) {
        super(snackBar);
    }

    ngOnInit() {
        this.userLoggedInSubscription = this.securityEventBus.userLoggedIn$
            .subscribe((user: UserModel) => {
                this.user = user;
            });

        this.categoriesLoadedSubscription = this.categoryEventBus.categoriesLoaded$
            .subscribe((categories: CategoryCollection) => {
                this.pending = false;
                this.categories = categories;
            });

        this.categorySavedSubscription = this.categoryEventBus.categorySaved$
            .subscribe((category: CategoryModel) => {
                this.categories.update(category);
            });

        this.categoryDeletedSubscription = this.categoryEventBus.categoryDeleted$
            .subscribe((category: CategoryModel) => {
                this.categories.delete(category);
            });
    }

    showCategoryForm(category?: CategoryModel): void {
        if (!isPresent(category)) {
            category = new CategoryModel();
        }

        const dialogRef = this.dialog.open(CategoryFormComponent);

        dialogRef.componentInstance.user = this.user;
        dialogRef.componentInstance.category = category;

        dialogRef.afterClosed()
            .filter(isPresent)
            .subscribe(() => {
                this.onCategorySaved();
            });
    }

    private onCategorySaved(): void {
        this.showMessage('Категория успешно сохранена.');
    }

    onCategoryDeleted(): void {
        this.showMessage('Категория успешно удалена.');
    }

    ngOnDestroy(): void {
        this.userLoggedInSubscription.unsubscribe();
        this.categoriesLoadedSubscription.unsubscribe();
        this.categorySavedSubscription.unsubscribe();
        this.categoryDeletedSubscription.unsubscribe();
    }

}
