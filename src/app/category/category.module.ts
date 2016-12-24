import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MdCardModule, MdIconModule, MdMenuModule } from '@angular/material';

import { CategoryCollectionResponseBodyToCategoryCollectionTransformer } from './category-collection-response-body-to-category-collection.transformer';
import { CategoryComponent } from './category.component';
import { CategoryEventBus } from './category.event-bus';
import { CategoryLocationToCategoryModelTransformer } from './category-location-to-category-model.transformer';
import { CategoryModelToCategoryRequestBodyTransformer } from './category-model-to-category-request-body.transformer';
import { CategoryResponseBodyToCategoryModelTransformer } from './category-response-body-to-category-model.transformer';
import { CategoryService } from './category.service';
import { RoutingModule } from '../routing/routing.module';

@NgModule({
    imports: [
        CommonModule,
        MdCardModule,
        MdIconModule,
        MdMenuModule,
        RoutingModule
    ],
    providers: [
        CategoryCollectionResponseBodyToCategoryCollectionTransformer,
        CategoryEventBus,
        CategoryLocationToCategoryModelTransformer,
        CategoryModelToCategoryRequestBodyTransformer,
        CategoryResponseBodyToCategoryModelTransformer,
        CategoryService
    ],
    declarations: [
        CategoryComponent
    ],
    exports: [
        CategoryComponent
    ]
})
export class CategoryModule {



}
