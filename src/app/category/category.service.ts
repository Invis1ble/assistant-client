import { Inject, Injectable, Injector } from '@angular/core';
import { Response } from '@angular/http';

import { Action, Body, Parameter } from 'ng2-rest-service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthenticatedRestService } from '../rest/authenticated-rest.service';
import { CONFIG } from '../config/config-token';
import { CategoryCollection } from './category.collection';
import { CategoryCollectionResponseBodyToCategoryCollectionTransformer } from './category-collection-response-body-to-category-collection.transformer';
import { CategoryEventBus } from './category.event-bus';
import { CategoryLocationToCategoryModelTransformer } from './category-location-to-category-model.transformer';
import { CategoryModel } from './category.model';
import { CategoryModelToCategoryRequestBodyTransformer } from './category-model-to-category-request-body.transformer';
import { CategoryResponseBodyToCategoryModelTransformer } from './category-response-body-to-category-model.transformer';
import { Config } from '../config/config';
import { UserModel } from '../user/user.model';
import { isPresent } from '../facade/lang';

@Injectable()
export class CategoryService extends AuthenticatedRestService {

    constructor(
        injector: Injector,
        @Inject(CONFIG) config: Config,
        private categoryEventBus: CategoryEventBus
    ) {
        super(injector, config);
    }

    @Action({
        path: '/categories/{id}',
        responseTransformer: CategoryResponseBodyToCategoryModelTransformer
    })
    getCategoryById(@Parameter('id') id: string): Observable<CategoryModel> {
        return null;
    }

    getUserCategories(user: UserModel): Observable<CategoryCollection> {
        return this.getCategoriesByUserId(user.id)
            .do((categories: CategoryCollection) => {
                this.categoryEventBus.categoriesLoaded$.next(categories);
            });
    }

    saveCategory(user: UserModel, category: CategoryModel): Observable<CategoryModel> {
        let category$: Observable<CategoryModel>;

        if (isPresent(category.id)) {
            category$ = this.updateCategory(category);
        } else {
            category$ = this.createCategory(user, category);
        }

        return category$.do((category: CategoryModel) => {
            this.categoryEventBus.categorySaved$.next(category);
        });
    }

    createCategory(user: UserModel, category: CategoryModel): Observable<CategoryModel> {
        return this.createUserCategory(user.id, category)
            .do((category: CategoryModel) => {
                this.categoryEventBus.categoryCreated$.next(category);
            });
    }


    updateCategory(category: CategoryModel): Observable<CategoryModel> {
        return this.updateCategoryById(category.id, category)
            .do((category: CategoryModel) => {
                this.categoryEventBus.categoryUpdated$.next(category);
            });
    }

    deleteCategory(category: CategoryModel): Observable<Response> {
        return this.deleteCategoryById(category.id)
            .do(() => {
                this.categoryEventBus.categoryDeleted$.next(category);
            });
    }

    @Action({
        path: '/users/{id}/categories',
        useRawResponse: true,
        requestTransformer: CategoryModelToCategoryRequestBodyTransformer,
        responseTransformer: CategoryLocationToCategoryModelTransformer
    })
    private createUserCategory(@Parameter('id') userId: string, @Body category: CategoryModel): Observable<CategoryModel> {
        return null;
    }

    @Action({
        path: '/users/{id}/categories',
        responseTransformer: CategoryCollectionResponseBodyToCategoryCollectionTransformer
    })
    private getCategoriesByUserId(@Parameter('id') id: string): Observable<CategoryCollection> {
        return null;
    }

    @Action({
        path: '/categories/{id}',
        method: 'PATCH',
        useRawResponse: true,
        requestTransformer: CategoryModelToCategoryRequestBodyTransformer,
        responseTransformer: CategoryLocationToCategoryModelTransformer
    })
    private updateCategoryById(@Parameter('id') id: string, @Body category: CategoryModel): Observable<CategoryModel> {
        return null;
    }

    @Action({
        path: '/categories/{id}',
        useRawResponse: true
    })
    private deleteCategoryById(@Parameter('id') id: string): Observable<Response> {
        return null;
    }
    
}
