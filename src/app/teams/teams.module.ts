import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsComponent } from './teams.component';
import { ViewTeamsComponent } from './view-teams/view-teams.component';
import { SharedModule } from '../shared/shared.module';
import { AddTeamsComponent } from './add-teams/add-teams.component';
import { TeamsService } from './teams.service';


@NgModule({
  declarations: [
    TeamsComponent,
    ViewTeamsComponent,
    AddTeamsComponent
  ],
  imports: [
    SharedModule,
    TeamsRoutingModule
  ],
  providers:[
    TeamsService
  ]
})
export class TeamsModule { }
