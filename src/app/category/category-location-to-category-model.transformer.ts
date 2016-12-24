import { Inject, Injectable, forwardRef } from '@angular/core';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Transformer } from 'ng2-rest-service';

import { CategoryModel } from './category.model';
import { CategoryService } from './category.service';

@Injectable()
export class CategoryLocationToCategoryModelTransformer implements Transformer<Response, Observable<CategoryModel>> {

    constructor(
        @Inject(forwardRef(() => CategoryService)) // circular dependency workaround
        private categoryService: CategoryService
    ) {

    }

    transform(response: Response): Observable<CategoryModel> {
        const segments = response.headers.get('Location').split('/');

        return this.categoryService.getCategoryById(segments[segments.length - 1]);
    }

}
