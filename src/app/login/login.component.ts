import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from '../services/messages.service';
import { LoginResponse } from './login.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  sent: boolean = false;
  loginForm!: FormGroup;
  showPassword: boolean = false;
  constructor(private fb: FormBuilder, private loginService: LoginService, private messageService: MessagesService, private router: Router) { }

  ngOnInit(): void {

    if ((this.router.url == '/login' || this.router.url == 'login') && localStorage.getItem('token')) {
      this.router.navigate(['/'])
    } else {
      this.router.navigate(['/login'])
    }

    this.loginForm = this.fb.group({
      email: ['user@test.com', [Validators.required, Validators.email]],
      password: ['Pass@123', [Validators.required, Validators.maxLength(10)]]
    })
  }


  submitForm() {

    this.sent = true;

    this.loginService.login(this.loginForm.value).subscribe({

      next: (resp: LoginResponse) => {
        this.sent = false
        resp.token ? [localStorage.setItem('token', resp.token), localStorage.setItem('refreshToken', resp.refreshToken), this.router.navigateByUrl('')] : this.messageService.errorToast(resp?.errors[0]);
      },
      error: (err: any) => {
        this.sent = false
        this.messageService.errorToast(err.error?.errors[0])
      }
    })
  }

}


