import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand.component';
 import { SharedModule } from '../shared/shared.module';
import { ViewBrandComponent } from './view-brand/view-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { BrandService } from './brand.service';
 

@NgModule({
  declarations: [
    BrandComponent,
     ViewBrandComponent,
     EditBrandComponent,
     AddBrandComponent,
   ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    SharedModule
  ],
  providers:[BrandService]
})
export class BrandModule { }
