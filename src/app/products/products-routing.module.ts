import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component';
import { ProductsComponent } from './products.component';
import { ViewProductsComponent } from './view-products/view-products.component';

const routes: Routes = [{
  path: '', component: ProductsComponent, children: [
    { path: '', component: ViewProductsComponent },
    { path: 'add', component: AddProductsComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
