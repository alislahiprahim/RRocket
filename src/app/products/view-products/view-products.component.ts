import { EditProductsComponent } from './../edit-products/edit-products.component';
import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/category/category.service';
import { MessagesService } from 'src/app/services/messages.service';
import { DeleteComponent } from 'src/app/shared/compontents/delete/delete.component';
import { environment } from 'src/environments/environment';
import { Product, ProductResponse } from '../models/product.model';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './view-products.component.html',
})
export class ViewProductsComponent implements OnInit {

  productView: number = 2;
  displayedColumns: string[] = ['images', 'nameAr', 'nameEn', 'originalPrice', 'discountPrice', 'clothGender', 'clothSize', 'actions'];

  filteredCategoryValue = new FormControl(null);
  readonly env = environment;
  filtringSubscription = new Subscription;

  constructor(private dialog: MatDialog,
    private messageService: MessagesService,
    public productService: ProductService,
    public categoryService: CategoryService) { }

  ngOnInit(): void {

    this.getAllCategory()

    this.filtringSubscription = this.filteredCategoryValue.valueChanges.subscribe((value: number) => {
      if (value) {
        this.productService.filteredProductList$.next(this.productService.productList$.value.filter((product) => { return product.categoryId === value }))
      } else {
        this.productService.filteredProductList$.next(this.productService.productList$.value)
      }
    })

    this.productService.productList$.value.length == 0 ? this.productService.getAllProducts() : null;
  }


  getAllProducts() {
    this.productService.getAllProducts()
  }

  getAllCategory() {
    this.categoryService.getAllCategory()
  }


  deleteProduct(item: Product) {
    debugger
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: 'auto',
      disableClose: true,
      data: { name: item.nameAr, id: item.id }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.message === 'DELETE') {
        this.productService.deleteProduct(result.id).subscribe({
          next: (resp: ProductResponse) => {
            if (resp.message == '' || resp.isSuccess == true) {
              this.messageService.topRightSuccessToast('تم الحذف بنجاح');
            } else {
              this.messageService.topRightFailureToast(resp.message);
            }
          },
          error: (err: any) => {
            this.messageService.topRightFailureToast(err.error.errors[0]);
          }
        })
      }
    })
  }


  updateProduct(item: Product) {
    debugger
    const dialogRef = this.dialog.open(EditProductsComponent, {
      data: item,
      disableClose: true,
      direction: 'rtl',
      width: '450px',
      height:'90%'
    })

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result == "DONE") {
        this.getAllProducts()
      }
    })
  }


  ngOnDestroy(): void {

    this.filtringSubscription.unsubscribe()
  }

}
