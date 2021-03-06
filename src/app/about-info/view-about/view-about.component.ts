import { Component, OnInit } from '@angular/core';
import { AboutInfoService } from '../about-info.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ActivateComponent } from 'src/app/shared/compontents/activate/activate.component';
import { AboutInfo, AboutInfoResponse } from '../models/aboutInfo.model';
import { MessagesService } from 'src/app/services/messages.service';
import { EditAboutComponent } from '../edit-about/edit-about.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'view-about',
  templateUrl: './view-about.component.html',
  styleUrls: ['../about-info.scss']
})
export class ViewAboutComponent implements OnInit {

  readonly env = environment
  aboutInfoList$!: Observable<AboutInfo[]>

  constructor(private dialog: MatDialog, public aboutInfoService: AboutInfoService, private messageService: MessagesService) { }

  ngOnInit(): void {
    this.getAllAboutInfo()
  }


  getAllAboutInfo() {
    this.aboutInfoList$ = this.aboutInfoService.getAllAboutInfo();
  }


  aboutInfoActivation(item: AboutInfo) {
    const dialogRef = this.dialog.open(ActivateComponent, {
      width: 'auto',
      disableClose: true,
      data: {
        id: item.id,
        name: item.name,
        isActive: item.isActive
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.message === 'ACTIVATE') {
        this.aboutInfoService.aboutInfoActivation(result.id).subscribe({
          next: (resp: AboutInfoResponse) => {
            if (resp.message == '' || resp.isSuccess == true) {
              !item.isActive ? this.messageService.topRightSuccessToast('تم الفعيل بنجاح') : this.messageService.topRightSuccessToast('تم الغاء الفعيل بنجاح');

            } else {
              this.messageService.topRightFailureToast(resp.message);
            }
          },
          error: (err: any) => {
            this.messageService.topRightFailureToast(err.error.errors[0]);
          }
        })
      }
    })
  }

  editAboutInfo(item: AboutInfo) {
    const dialogRef = this.dialog.open(EditAboutComponent, {
      data: item,
      disableClose: true,
      direction: 'rtl',
      width: '450px'
    })

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'DONE') {
        this.getAllAboutInfo()
      }
    })
  }

}
