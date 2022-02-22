import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryComponent } from './category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';

const routes: Routes = [{
  path: '', component: CategoryComponent, children: [
    { path: '', component: ViewCategoryComponent },
    { path: 'add', component: AddCategoryComponent,data:{title:'اضافة'} },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
