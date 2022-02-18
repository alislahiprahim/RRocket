import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../shared/shared.module';
import { ViewProductsComponent } from './view-products/view-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { CategoryService } from '../category/category.service';
import { ProductService } from './product.service';


@NgModule({
  declarations: [
    ProductsComponent,
    ViewProductsComponent,
    EditProductsComponent,
    AddProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ],
  providers: [ProductService, CategoryService]
})
export class ProductsModule { }
