import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeamsComponent } from './add-teams/add-teams.component';
import { TeamsComponent } from './teams.component';
import { ViewTeamsComponent } from './view-teams/view-teams.component';

const routes: Routes = [
  {
    path: '', component: TeamsComponent, children: [
      { path: '', component: ViewTeamsComponent },
      { path: 'add', component: AddTeamsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamsRoutingModule { }
