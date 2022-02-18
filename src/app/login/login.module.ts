import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from './login.service';


const routes: Routes = [
  { path: '', component: LoginComponent }
]

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [LoginService]
})
export class LoginModule { }
