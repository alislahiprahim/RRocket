import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BrandService } from 'src/app/brand/brand.service';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../category.service';

@Component({
  templateUrl: './view-category.component.html',
})
export class ViewCategoryComponent implements OnInit {

  filteredBrandValue = new FormControl('');
  readonly env = environment
  filtringSubscription = new Subscription;

  constructor(public categoryService: CategoryService, public brandService: BrandService,) { }

  ngOnInit(): void {

    this.getAllbrands()
    this.filtringSubscription = this.filteredBrandValue.valueChanges.subscribe((value: number) => {
      if (value) {
        const currentfilteredCategory = this.categoryService.categoryList$.value.filter(cat => { return value === cat.id });
        this.categoryService.filteredCategoryList$.next(currentfilteredCategory)
      }else{
        this.categoryService.filteredCategoryList$.next(this.categoryService.categoryList$.value)
      }
    })

    this.categoryService.categoryList$.value.length == 0 ? this.categoryService.getAllCategory() : null;
  }


  getAllTeams() {
    this.categoryService.getAllCategory()
  }

  getAllbrands() {
    this.brandService.brandList$.value.length == 0 ? this.brandService.getAllBrands() : null;
  }




  ngOnDestroy(): void {

    this.filtringSubscription.unsubscribe()
  }

}
