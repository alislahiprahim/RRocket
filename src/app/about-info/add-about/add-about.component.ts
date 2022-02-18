import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { resetform } from 'src/app/shared/validators/forms';
import { AboutInfoService } from '../about-info.service';
import { AboutInfo, AboutInfoResponse } from '../models/aboutInfo.model';

@Component({
  selector: 'add-about',
  templateUrl: './add-about.component.html',
  styleUrls: ['../about-info.scss']

})
export class AddAboutComponent implements OnInit {

  sent: boolean = false;
  imageList: any[] = [];
  aboutInfoForm!: FormGroup;

  constructor(private fb: FormBuilder, private aboutInfoService: AboutInfoService, private messageService: MessagesService) { }

  ngOnInit(): void {

    this.aboutInfoForm = this.fb.group({
      name: [null, Validators.required],
      descriptionAr: [null, Validators.required],
      descriptionEn: [null, Validators.required],
      aboutUsAr: [null, Validators.required],
      aboutUsEn: [null, Validators.required],
      twitter: [null, Validators.required],
      facebook: [null, Validators.required],
      instagram: [null, Validators.required],
      website: [null, Validators.required],
      address: [null, Validators.required],
      mobileNumber: [null, [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(11), Validators.minLength(8)]],
      secondMobileNumber: [null, [Validators.pattern('[0-9]*'), Validators.maxLength(11), Validators.minLength(8)]],
      logoUrl: [null, Validators.required],

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
    this.aboutInfoService.addAboutInfo(data).subscribe({
      next: (resp: AboutInfoResponse) => {
        this.sent = false;
        if (resp.message == '' || resp.isSuccess == true) {
          this.messageService.successToast('تم اضافة عن الشركة بنجاح');
          resetform(this.aboutInfoForm);
          this.imageList = []
        } else {
          this.messageService.errorToast(resp.message);
          
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
