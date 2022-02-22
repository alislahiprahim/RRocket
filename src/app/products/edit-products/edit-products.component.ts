import { ProductService } from './../product.service';
import { CategoryService } from 'src/app/category/category.service';
import { closthSizes, Product, ProductResponse } from './../models/product.model';
import { ViewProductsComponent } from './../view-products/view-products.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
 import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './edit-products.component.html',
})
export class EditProductsComponent implements OnInit {
  env: any = environment
  sent: boolean = false;
  imageList: any[] = [];
  UpdateProductForm!: FormGroup
  readonly closthSizes = closthSizes

  constructor(private fb: FormBuilder,
    public MyCategoryService: CategoryService,
    public MyProductService: ProductService,
    private messageService: MessagesService,
    public dialogRef: MatDialogRef<ViewProductsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) { }

  ngOnInit(): void {
    this.UpdateProductForm = this.fb.group({
      nameAr: [this.data.nameAr, [Validators.required]],
      nameEn: [this.data.nameEn, [Validators.required]],
      description: [this.data.description, [Validators.required]],
      directCommissionPercentage: [this.data.directCommissionPercentage, [Validators.required, Validators.pattern('[0-9]*')]],
      originalPrice: [this.data.originalPrice, [Validators.required, Validators.pattern('[0-9]*')]],
      discountPrice: [this.data.discountPrice, Validators.pattern('[0-9]*')],
      clothSize: [this.data.clothSize, Validators.pattern('[0-9]*')],
      clothGender: [this.data.clothGender],
      categoryId: [this.data.categoryId, Validators.required],
    })
  }


  get p() {
    return this.UpdateProductForm.controls
  }


  getAllbrands() {
    this.MyCategoryService.categoryList$.value.length == 0 ? this.MyCategoryService.getAllCategory() : null;
  }

  submit() {
    this.sent = true;
    let formData = new FormData();
    let form = this.UpdateProductForm.value;

    formData.append('id', this.data.id.toString());
    for (let key in form) {
      formData.append(key, form[key]);
    }
    if (this.imageList) {
      this.imageList.forEach(element => {
        formData.append('photo', element)
      })
    }
    this.UpdateProduct(formData)
  }



  UpdateProduct(data: any) {
    this.MyProductService.UpdateProduct(data).subscribe({
      next: (resp: ProductResponse) => {
         this.sent = false;
        if (resp.message == '' || resp.isSuccess == true) {
          this.messageService.successToast('تم تعديل المنتج بنجاح');
          this.dialogRef.close('DONE')
        } else {
          this.messageService.errorToast(resp.message);
          this.dialogRef.close('DONE')
        }
      },
      error: (err: any) => {
         this.messageService.errorToast(err.error.errors);
        this.sent = false;
      },
      complete: () => { this.sent = false; }
    })
  }


  getImages(event: any) {
    this.imageList = [...event]
  }

}
