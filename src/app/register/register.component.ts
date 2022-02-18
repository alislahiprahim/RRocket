import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from '../services/messages.service';
import { TeamsService } from '../teams/teams.service';
import { ResponseBody } from './models/register.model';
import { RegisterService } from './register.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  sent: boolean = false;
  userCodeForm!: FormGroup;
  teamCodeForm!: FormGroup;
  personalForm!: FormGroup;
  accountInfoForm!: FormGroup;
  isEditable = false;

  constructor(private fb: FormBuilder, private router: Router, private registerService: RegisterService, private messageService: MessagesService, public teamService: TeamsService) { }

  ngOnInit() {
    this.getTeams()
    this.UserCodeForm()
    this.TeamCodeForm()
    this.PersonalForm()
    this.AccountInfoForm()
  }


  getTeams() {
    this.teamService.teamsList$.value.length == 0 ? this.teamService.getAllTeams() : null;
  }

  UserCodeForm() {
    this.userCodeForm = this.fb.group({
      userCode: [null, Validators.required],
    })

  }

  TeamCodeForm() {
    this.teamCodeForm = this.fb.group({
      teamCode: [null, Validators.required],
      userCode: [null, Validators.required],
    })
  }

  PersonalForm() {
    this.personalForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, [Validators.required, Validators.maxLength(11)]],
      nationalId: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      gender: [null, Validators.required],
      relativeRelation: [null, Validators.required],
      inheritorName: [null, Validators.required]
    })
  }

  AccountInfoForm() {
    this.accountInfoForm = this.fb.group({
      password: [null],
      confirmedPassword: [null]
    })

    this.accountInfoForm.controls['confirmedPassword'].valueChanges.subscribe((value: any) => {
      if (value != this.accountInfoForm.controls['password'].value) {
        this.accountInfoForm.controls['confirmedPassword'].setErrors({ match: true })
      }
    })
  }

  submit() {
    this.sent = true
    const registerObject = Object.assign(
      this.personalForm.value,
      this.accountInfoForm.value,
      this.teamCodeForm.value
    );

    console.log(registerObject)

    this.registerService.registerUser(registerObject).subscribe({

      next: (resp: any) => {
        this.sent = false
        resp.token ? [this.router.navigateByUrl('/login')] : this.messageService.errorToast(resp?.errors[0]);
      },
      error: (err: any) => {
        this.sent = false
        this.messageService.errorToast(err.error?.errors[0])
      }
    })
  }

  checkParentCodeExists() {

    this.registerService.checkParentCode(this.userCodeForm.controls['userCode'].value).subscribe({
      next: (resp: ResponseBody) => {
        if (resp.isSuccess) {
          this.userCodeForm.controls['userCode'].setValue(resp.data);
          this.messageService.successToast(resp.message)
        } else {
          this.messageService.errorToast(resp.message)
        }
      },
      error: (err: any) => {
        this.messageService.errorToast(err)
      },
      complete: () => { }
    })
  }

  checkUserCodeExists() {
    this.registerService.checkUserCode(this.teamCodeForm.controls['teamCode'].value, this.teamCodeForm.controls['userCode'].value).subscribe({
      next: (resp: ResponseBody) => {
        if (resp.isSuccess) {

        }
      }
    })
  }


}
