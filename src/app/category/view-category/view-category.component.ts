import { EditCategoryComponent } from './../edit-category/edit-category.component';
import { Category, CategoryResponse } from './../models/category.model';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BrandService } from 'src/app/brand/brand.service';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../category.service';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from 'src/app/services/messages.service';
import { DeleteComponent } from 'src/app/shared/compontents/delete/delete.component';

@Component({
  templateUrl: './view-category.component.html',
})
export class ViewCategoryComponent implements OnInit {

  filteredBrandValue = new FormControl('');
  readonly env = environment
  filtringSubscription = new Subscription;

  constructor(public categoryService: CategoryService,
    public brandService: BrandService,
     private dialog: MatDialog,
    private messageService: MessagesService) { }

  ngOnInit(): void {

    this.getAllbrands()
    this.filtringSubscription = this.filteredBrandValue.valueChanges.subscribe((value: number) => {
      if (value) {
        const currentfilteredCategory = this.categoryService.categoryList$.value.filter(cat => { return value === cat.id });
        this.categoryService.filteredCategoryList$.next(currentfilteredCategory)
      } else {
        this.categoryService.filteredCategoryList$.next(this.categoryService.categoryList$.value)
      }
    })

    this.categoryService.categoryList$.value.length == 0 ? this.categoryService.getAllCategory() : null;
  }


  getAllCategory() {
    this.categoryService.getAllCategory()
  }

  getAllbrands() {
    this.brandService.brandList$.value.length == 0 ? this.brandService.getAllBrands() : null;
  }

  ngOnDestroy(): void {

    this.filtringSubscription.unsubscribe()
  }


  updateCategory(item: Category) {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      data: item,
      disableClose: true,
      direction: 'rtl',
      width: '450px'
    })

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result == "DONE") {
        this.getAllCategory()
      }
    })
  }


  deleteCategory(item: Category) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: 'auto',
      disableClose: true,
      data: { name: item.name, id: item.id }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.message === 'DELETE') {
        this.categoryService.deleteCategory(result.id).subscribe({
          next: (resp: boolean) => {
            if (resp == true) {
              this.messageService.deleteSuccessToast('تم الحذف بنجاح');
              this.getAllCategory()
            } else {
              this.messageService.deleteFailureToast("حدث خطأ");
            }
          },
          error: (err: any) => {
            this.messageService.deleteFailureToast(err.error.errors[0]);
          }
        })
      }
    })
  }


}
