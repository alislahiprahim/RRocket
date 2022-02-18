import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrandService } from 'src/app/brand/brand.service';
import { MessagesService } from 'src/app/services/messages.service';
import { resetform } from 'src/app/shared/validators/forms';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../category.service';
import { CategoryResponse } from '../models/category.model';

@Component({
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent implements OnInit {

  readonly env = environment
  sent: boolean = false;
  imageList: any[] = [];
  categorysForm!: FormGroup;

  constructor(private fb: FormBuilder, private categorysService: CategoryService, public brandService: BrandService, private messageService: MessagesService) { }

  ngOnInit(): void {

    this.getAllbrands()

    this.categorysForm = this.fb.group({
      name: [null, Validators.required],
      productCode: [null, Validators.required],
      brandId: [null, Validators.required],
    })
  }

  getAllbrands() {
    this.brandService.brandList$.value.length == 0 ? this.brandService.getAllBrands() : null;
  }

  get c() {
    return this.categorysForm.controls
  }



  submit() {

    this.sent = true;
    let formData = new FormData();
    let form = this.categorysForm.value;

    for (let key in form) {
      formData.append(key, form[key]);
    }

    if (this.imageList) {
      this.imageList.forEach(element => {
        formData.append('photo', element)
      })
    }
    this.sendcategorys(formData)
  }

  sendcategorys(data: any) {
    this.categorysService.addCategory(data).subscribe({
      next: (resp: CategoryResponse) => {
        this.sent = false;
        if (resp.message == '' || resp.isSuccess == true) {
          this.messageService.successToast('تم اضافة عن فئة بنجاح');
          resetform(this.categorysForm);
          this.imageList = []
        } else {
          this.messageService.errorToast(resp.message);
        }
      },
      error: (err: any) => {
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
