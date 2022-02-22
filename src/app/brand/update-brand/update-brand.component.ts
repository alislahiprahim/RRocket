import { Brand, BrandsResponse } from './../models/brand.model';
import { BrandService } from './../brand.service';
import { ViewBrandComponent } from './../view-brand/view-brand.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from 'src/app/services/messages.service';
@Component({
  templateUrl: './update-brand.component.html',
})
export class UpdateBrandComponent implements OnInit {
  sent: boolean = false;
  imageList: any[] = [];
  UpdateBransForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private MyBrandService: BrandService,
    private messageService: MessagesService,
    public dialogRef: MatDialogRef<ViewBrandComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Brand) { }

  ngOnInit(): void {
    this.UpdateBransForm = this.fb.group({
      name: [this.data.name, Validators.required],
    })
  }

  get t() {
    return this.UpdateBransForm.controls
  }


  submit() {
    this.sent = true;
    let formData = new FormData();
    let form = this.UpdateBransForm.value;

    formData.append('id', this.data.id.toString());
    for (let key in form) {
      formData.append(key, form[key]);
    }
    if (this.imageList) {
      this.imageList.forEach(element => {
        formData.append('photo', element)
      })
    }
    this.sendAboutInfo(formData)
  }

  sendAboutInfo(data: any) {
    this.MyBrandService.UpdateBrand(data).subscribe({
      next: (resp: BrandsResponse) => {
        debugger
        this.sent = false;
        if (resp.message == '' || resp.isSuccess == true) {
          this.messageService.successToast('تم تعديل الماركة التجارية بنجاح');
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
