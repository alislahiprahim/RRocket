import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { resetform } from 'src/app/shared/validators/forms';
import { TeamsResponse } from '../models/teams.model';
import { TeamsService } from '../teams.service';

@Component({
  templateUrl: './add-teams.component.html',
})
export class AddTeamsComponent implements OnInit {

  sent: boolean = false;
  imageList: any[] = [];
  teamsForm!: FormGroup;

  constructor(private fb: FormBuilder, private teamsService: TeamsService, private messageService: MessagesService) { }

  ngOnInit(): void {

    this.teamsForm = this.fb.group({
      name: [null, Validators.required],
      teamCode: [null, Validators.required],
    })
  }

  get t() {
    return this.teamsForm.controls
  }


  submit() {

    this.sent = true;
    let formData = new FormData();
    let form = this.teamsForm.value;

    for (let key in form) {
      formData.append(key, form[key]);
    }

    if (this.imageList) {
      this.imageList.forEach(element => {
        formData.append('photo', element)
      })
    }
    this.sendteams(formData)
  }

  sendteams(data: any) {
    this.teamsService.addTeams(data).subscribe({
      next: (resp: TeamsResponse) => {
        this.sent = false;
        if (resp.message == '' || resp.isSuccess == true) {
          this.messageService.successToast('تم اضافة عن فريق بنجاح');
          this.teamsService.teamsList$.value.push(resp.data)
          this.teamsService.teamsList$.next(this.teamsService.teamsList$.value)
          resetform(this.teamsForm);
          this.imageList = []
        } else {
          this.messageService.errorToast(resp.message);
        }
      },
      error: (err: any) => {
        this.sent = false;

        this.messageService.errorToast(err.error.errors[0]);
      },
      complete: () => { this.sent = false; }
    })
  }


  getImages(event: any) {
    this.imageList = [...event]
  }

}
