import { environment } from './../../../environments/environment';
import { BrandService } from 'src/app/brand/brand.service';
import { Category, CategoryResponse } from './../models/category.model';
import { ViewCategoryComponent } from './../view-category/view-category.component';
import { CategoryService } from 'src/app/category/category.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './edit-category.component.html',
})
export class EditCategoryComponent implements OnInit {
  env: any = environment
  sent: boolean = false;
  imageList: any[] = [];
  UpdateCategoryForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private MyCategoryService: CategoryService,
    public brandService: BrandService,
    private messageService: MessagesService,
    public dialogRef: MatDialogRef<ViewCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category) { }

  ngOnInit(): void {
    this.getAllbrands()

    this.UpdateCategoryForm = this.fb.group({
      name: [this.data.name, Validators.required],
      productCode: [this.data.productCode, Validators.required],
      brandId: [this.data.brandId, Validators.required],
    })
  }

  get t() {
    return this.UpdateCategoryForm.controls
  }


  getAllbrands() {
    this.brandService.brandList$.value.length == 0 ? this.brandService.getAllBrands() : null;
  }

  submit() {
    this.sent = true;
    let formData = new FormData();
    let form = this.UpdateCategoryForm.value;

    formData.append('id', this.data.id.toString());
    for (let key in form) {
      formData.append(key, form[key]);
    }
    if (this.imageList) {
      this.imageList.forEach(element => {
        formData.append('photo', element)
      })
    }
    this.UpdateCategory(formData)
  }

  UpdateCategory(data: any) {
    this.MyCategoryService.UpdateCategory(data).subscribe({
      next: (resp: CategoryResponse) => {
        debugger
        this.sent = false;
        if (resp.message == '' || resp.isSuccess == true) {
          this.messageService.successToast('تم تعديل الفريق بنجاح');
          this.dialogRef.close('DONE')
        } else {
          this.messageService.errorToast(resp.message);
          this.dialogRef.close('DONE')
        }
      },
      error: (err: any) => {
        debugger
        this.messageService.errorToast(err.error.errors[0]);
        this.sent = false;
      },
      complete: () => { this.sent = false; }
    })
  }


  getImages(event: any) {
    this.imageList = [...event]
  }
}
