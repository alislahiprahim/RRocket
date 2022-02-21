import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
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
  stepperOrientation!: Observable<StepperOrientation>;

  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver, private router: Router, private registerService: RegisterService, private messageService: MessagesService, public teamService: TeamsService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

  }

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
      inheritorName: [null, Validators.required],
      parentId: [null]
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
    if (this.userCodeForm.controls['userCode'].value?.trim()) {
      this.registerService.checkParentCode(this.userCodeForm.controls['userCode'].value).subscribe({
        next: (resp: ResponseBody) => {
          if (resp.isSuccess) {
            this.messageService.topRightSuccessToast('كود مستخدم صحيح');
            this.personalForm.controls['parentId'].patchValue(resp.data.userId);
          } else {
            this.messageService.topRightFailureToast(resp.message)
          }
        },
        error: (err: any) => {

          this.messageService.topRightFailureToast(err.error.message)
        },
        complete: () => { }
      })
    } else { }

   }

  checkUserCodeExists() {
    this.registerService.checkUserCode(this.teamCodeForm.controls['teamCode'].value, this.teamCodeForm.controls['userCode'].value).subscribe({
      next: (resp: ResponseBody) => {
        if (resp.isSuccess) {
          this.messageService.topRightSuccessToast('تم قبول كود المستخدم');
         } else {
          this.messageService.topRightFailureToast(resp.message)
        }
      },
      error: (err: any) => {

        this.messageService.topRightFailureToast(err.error.message)
      },
      complete: () => { }
    })
  }


}
