import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from 'src/app/services/messages.service';
import { resetform } from 'src/app/shared/validators/forms';
import { AboutInfoService } from '../about-info.service';
import { AboutInfo, AboutInfoResponse } from '../models/aboutInfo.model';
import { ViewAboutComponent } from '../view-about/view-about.component';

@Component({
  templateUrl: './edit-about.component.html',
})
export class EditAboutComponent implements OnInit {

  sent: boolean = false;
  imageList: any[] = [];
  aboutInfoForm!: FormGroup;


  constructor(private fb: FormBuilder, private aboutInfoService: AboutInfoService, private messageService: MessagesService, public dialogRef: MatDialogRef<ViewAboutComponent>, @Inject(MAT_DIALOG_DATA) public data: AboutInfo) { }

  ngOnInit(): void {
    debugger
    this.aboutInfoForm = this.fb.group({
      id:[this.data.id],
      name: [this.data.name, Validators.required],
      descriptionAr: [this.data.descriptionAr, Validators.required],
      descriptionEn: [this.data.descriptionEn, Validators.required],
      aboutUsAr: [this.data.aboutUsAr, Validators.required],
      aboutUsEn: [this.data.aboutUsEn, Validators.required],
      twitter: [this.data.twitter, Validators.required],
      facebook: [this.data.facebook, Validators.required],
      instagram: [this.data.instagram, Validators.required],
      website: [this.data.website, Validators.required],
      address: [this.data.address, Validators.required],
      mobileNumber: [this.data.mobileNumber, [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(11), Validators.minLength(8)]],
      secondMobileNumber: [this.data.secondMobileNumber, [Validators.pattern('[0-9]*'), Validators.maxLength(11), Validators.minLength(8)]],
      logoUrl: [this.data.logoUrl, Validators.required],

    })

  }

  get aI() {
    return this.aboutInfoForm.controls
  }

  submit() {

    this.sent = true;
    let formData = new FormData();
    let form = this.aboutInfoForm.value;

    for (let key in form) {
      formData.append(key, form[key]);
    }

    if (this.imageList) {
      this.imageList.forEach(element => {
        formData.append('photos', element)
      })
    }
    this.sendAboutInfo(formData)
  }

  sendAboutInfo(data: any) {
    this.aboutInfoService.editAboutInfo(data).subscribe({
      next: (resp: AboutInfoResponse) => {
        this.sent = false;
        if (resp.message == '' || resp.isSuccess == true) {
          this.messageService.successToast('تم تعديل عن الشركة بنجاح');
          this.dialogRef.close('DONE')

        } else {
          this.messageService.errorToast(resp.message);
          this.dialogRef.close('DONE')
        }
      },
      error: (err: any) => {
        this.messageService.errorToast(err);
        this.sent = false;
      },
      complete: () => { this.sent = false; }
    })
  }


  getImages(event: any) {
    this.imageList = [...event]
  }

}
