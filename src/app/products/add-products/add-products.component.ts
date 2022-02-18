import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/category/category.service';
import { MessagesService } from 'src/app/services/messages.service';
import { resetform } from 'src/app/shared/validators/forms';
import { environment } from 'src/environments/environment';
import { ProductResponse, closthSizes } from '../models/product.model';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './add-products.component.html',
  styles:[
    `
    .example-radio-group {
    display: flex;
    flex-direction: column;
    margin: 15px 0;
    align-items: flex-start;
}

.example-radio-button {
    margin: 5px;
}`
  ]
})
export class AddProductsComponent implements OnInit {
  
  readonly closthSizes = closthSizes
  readonly env = environment
  sent: boolean = false;
  imageList: any[] = [];
  productsForm!: FormGroup;

  constructor(private fb: FormBuilder, private productsService: ProductService, public categoryService: CategoryService, private messageService: MessagesService) { }

  ngOnInit(): void {

    this.getAllCategory()

    this.productsForm = this.fb.group({
      nameAr: [null, [Validators.required]],
      nameEn: [null, [Validators.required]],
      description: [null, [Validators.required]],
      directCommissionPercentage: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      originalPrice: [null, [Validators.required, Validators.pattern('[0-9]*')]],
      discountPrice: [null, Validators.pattern('[0-9]*')],
      clothSize: [null, Validators.pattern('[0-9]*')],
      clothGender: [null],
      categoryId: [null, Validators.required],
    })
  }

  getAllCategory() {
    this.categoryService.categoryList$.value.length == 0 ? this.categoryService.getAllCategory() : null;
  }

  get p() {
    return this.productsForm.controls
  }



  submit() {

    this.sent = true;
    let formData = new FormData();
    let form = this.productsForm.value;

    for (let key in form) {
      formData.append(key, form[key]);
    }

    if (this.imageList) {
      this.imageList.forEach(element => {
        formData.append('photos', element)
      })
    }
    this.sendproducts(formData)
  }

  sendproducts(data: any) {
    this.productsService.addProduct(data).subscribe({
      next: (resp: ProductResponse) => {
        this.sent = false;
        if (resp.message == '' || resp.isSuccess == true) {
          this.messageService.successToast('تم اضافة عن المنتج بنجاح');
          resetform(this.productsForm);
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
