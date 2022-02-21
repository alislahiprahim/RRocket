import { ViewTeamsComponent } from './../view-teams/view-teams.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagesService } from 'src/app/services/messages.service';
import { resetform } from 'src/app/shared/validators/forms';
import { Teams, TeamsResponse } from '../models/teams.model';
import { TeamsService } from '../teams.service';

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent implements OnInit {
  sent: boolean = false;
  imageList: any[] = [];
  teamsForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private teamsService: TeamsService,
    private messageService: MessagesService,
    public dialogRef: MatDialogRef<ViewTeamsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Teams) { }

  ngOnInit(): void {
    this.teamsForm = this.fb.group({
      name: [this.data.name, Validators.required],
      teamCode: [this.data.teamCode, Validators.required],
    })
  }

  get t() {
    return this.teamsForm.controls
  }


  submit() {
    this.sent = true;
    let formData = new FormData();
    let form = this.teamsForm.value;

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
    this.teamsService.updateTeams(data).subscribe({
      next: (resp: TeamsResponse) => {
        debugger
        this.sent = false;
        if (resp.message == '' || resp.isSuccess == true) {
          this.messageService.successToast('تم تعديل الفريق بنجاح');
          this.dialogRef.close(this.teamsForm.value)
        } else {
          this.messageService.errorToast(resp.message);
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
