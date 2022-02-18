import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Teams } from '../models/teams.model';
import { TeamsService } from '../teams.service';

@Component({
  templateUrl: './view-teams.component.html',

})
export class ViewTeamsComponent implements OnInit {

  teamView: number = 2;
  displayedColumns: string[] = ['photo', 'name', 'teamCode', 'actions'];


  readonly env = environment

  constructor(public teamsService: TeamsService) { }

  ngOnInit(): void {
    this.teamsService.teamsList$.value.length == 0 ? this.teamsService.getAllTeams() : null;
  }


  getAllTeams() {
    this.teamsService.getAllTeams()
  }

  deleteTeam(item: Teams) {

  }

}
