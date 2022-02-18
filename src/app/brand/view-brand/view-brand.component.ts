import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BrandService } from '../brand.service';

@Component({
  templateUrl: './view-brand.component.html',
})
export class ViewBrandComponent implements OnInit {


  readonly env = environment

  constructor(public brandService: BrandService) { }

  ngOnInit(): void {
    this.brandService.brandList$.value.length == 0 ? this.brandService.getAllBrands() : null;
  }


  getAllTeams() {
    this.brandService.getAllBrands()
  }


}
