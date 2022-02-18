import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TeamsService } from '../teams.service';

@Component({
  templateUrl: './view-teams.component.html',

})
export class ViewTeamsComponent implements OnInit {

  readonly env = environment

  constructor(public teamsService: TeamsService) { }

  ngOnInit(): void {
    this.teamsService.teamsList$.value.length == 0 ? this.teamsService.getAllTeams() : null;
  }


  getAllTeams() {
    this.teamsService.getAllTeams()
  }

}