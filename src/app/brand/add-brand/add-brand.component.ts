import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { resetform } from 'src/app/shared/validators/forms';
import { BrandService } from '../brand.service';
import { BrandsResponse } from '../models/brand.model';

@Component({
  templateUrl: './add-brand.component.html',
})
export class AddBrandComponent implements OnInit {

  sent: boolean = false;
  imageList: any[] = [];
  brandsForm!: FormGroup;

  constructor(private fb: FormBuilder, private brandsService: BrandService, private messageService: MessagesService) { }

  ngOnInit(): void {

    this.brandsForm = this.fb.group({
      name: [null, Validators.required],
     })
  }

  get t() {
    return this.brandsForm.controls
  }


  submit() {

    this.sent = true;
    let formData = new FormData();
    let form = this.brandsForm.value;

    for (let key in form) {
      formData.append(key, form[key]);
    }

    if (this.imageList) {
      this.imageList.forEach(element => {
        formData.append('photo', element)
      })
    }
    this.sendbrands(formData)
  }

  sendbrands(data: any) {
    this.brandsService.addBrand(data).subscribe({
      next: (resp: BrandsResponse) => {
        this.sent = false;
        if (resp.message == '' || resp.isSuccess == true) {
          this.messageService.successToast('تم اضافة عن ماركة تجارية بنجاح');
          resetform(this.brandsForm);
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
