import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { CategoryCollection } from './category.collection';
import { CategoryModel } from './category.model';

@Injectable()
export class CategoryEventBus {

    categoriesLoaded$ = new ReplaySubject<CategoryCollection>(1);
    categorySaved$ = new ReplaySubject<CategoryModel>();
    categoryCreated$ = new ReplaySubject<CategoryModel>();
    categoryUpdated$ = new ReplaySubject<CategoryModel>();
    categoryDeleted$ = new ReplaySubject<CategoryModel>();

}
