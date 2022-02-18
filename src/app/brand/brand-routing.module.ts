import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { BrandComponent } from './brand.component';
import { ViewBrandComponent } from './view-brand/view-brand.component';

const routes: Routes = [
  {
    path: '', component: BrandComponent, children: [
      { path: '', component: ViewBrandComponent },
      { path: 'add', component: AddBrandComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
