import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { TeamsService } from '../teams/teams.service';
import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';


const routes: Routes = [
  { path: '', component: RegisterComponent }
]


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
    
  ],
  providers: [RegisterService,TeamsService]
})
export class RegisterModule { }
