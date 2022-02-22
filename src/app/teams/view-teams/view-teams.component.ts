import { MessagesService } from 'src/app/services/messages.service';
import { UpdateTeamComponent } from '../update-team/update-team.component';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Teams, TeamsResponse } from '../models/teams.model';
import { TeamsService } from '../teams.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/compontents/delete/delete.component';

@Component({
  templateUrl: './view-teams.component.html',

})
export class ViewTeamsComponent implements OnInit {

  teamView: number = 2;
  displayedColumns: string[] = ['photo', 'name', 'teamCode', 'actions'];


  readonly env = environment

  constructor(public teamsService: TeamsService,
     private dialog: MatDialog,
    private messageService:MessagesService) { }

  ngOnInit(): void {
    this.teamsService.teamsList$.value.length == 0 ? this.teamsService.getAllTeams() : null;
  }


  getAllTeams() {
    this.teamsService.getAllTeams()
  }



  updateTeam(item: Teams) {
    const dialogRef = this.dialog.open(UpdateTeamComponent, {
      data: item,
      disableClose: true,
      direction: 'rtl',
      width: '450px'
    })

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result) {
        this.getAllTeams()
      }
    })
  }


  deleteTeam(item: Teams) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: 'auto',
      disableClose: true,
      data: { name: item.name, id: item.id }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.message === 'DELETE') {
        this.teamsService.deleteTeam(result.id).subscribe({
          next: (resp: TeamsResponse) => {
            if (resp.message == '' || resp.isSuccess == true) {
              this.messageService.deleteSuccessToast('تم الحذف بنجاح');
              this.getAllTeams()
            } else {
              this.messageService.deleteFailureToast(resp.message);
            }
          },
          error: (err: any) => {
            this.messageService.deleteFailureToast(err.error.errors[0]);
          }
        })
      }
    })
  }
}
