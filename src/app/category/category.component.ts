import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Response } from '@angular/http';

import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

import { AbstractComponent } from '../shared/abstract-component';
import { CategoryModel } from './category.model';
import { CategoryService } from './category.service';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends AbstractComponent {

    @Output() onCategoryEdit = new EventEmitter<CategoryModel>();
    @Output() onCategoryDeleted = new EventEmitter<CategoryModel>();

    @Input() category: CategoryModel;

    constructor(
        snackBar: MdSnackBar,
        private categoryService: CategoryService,
        private confirmDialog: ConfirmDialogService
    ) {
        super(snackBar);
    }

    editCategory(): void {
        this.onCategoryEdit.emit(this.category);
    }

    deleteCategory(): void {
        this.confirmDialog.confirm('Подтверждение', 'Вы уверены, что хотите удалить категорию?')
            .filter((confirmed: boolean) => confirmed)
            .mergeMap((): Observable<Response> => {
                return this.categoryService.deleteCategory(this.category);
            })
            .subscribe(
                (response: Response) => {
                    this.onCategoryDeleted.emit(this.category);
                },
                (response: Response): void => {
                    this.handleError(response);
                }
            );
    }

}
