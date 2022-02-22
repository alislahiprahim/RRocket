import { Brand, BrandsResponse } from './../models/brand.model';
import { UpdateBrandComponent } from './../update-brand/update-brand.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessagesService } from 'src/app/services/messages.service';
import { environment } from 'src/environments/environment';
import { BrandService } from '../brand.service';
import { DeleteComponent } from 'src/app/shared/compontents/delete/delete.component';

@Component({
  templateUrl: './view-brand.component.html',
})
export class ViewBrandComponent implements OnInit {


  readonly env = environment

  constructor(public brandService: BrandService,
    private dialog: MatDialog,
    private messageService: MessagesService) { }

  ngOnInit(): void {
    this.brandService.brandList$.value.length == 0 ? this.brandService.getAllBrands() : null;
  }


  getAllTeams() {
    this.brandService.getAllBrands()
  }




  updateBrand(item: Brand) {
    const dialogRef = this.dialog.open(UpdateBrandComponent, {
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


  deleteBrand(item: Brand) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: 'auto',
      disableClose: true,
      data: { name: item.name, id: item.id }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result.message === 'DELETE') {
        this.brandService.deleteBrand(result.id).subscribe({
          next: (resp: boolean) => {
            if (resp == true) {
              this.getAllTeams()
              this.messageService.topRightSuccessToast('تم الحذف بنجاح');
            } else {
              this.messageService.topRightFailureToast("حدث خطأ");
            }
          },
          error: (err: any) => {
            this.messageService.topRightFailureToast(err.error);
          }
        })
      }
    })
  }


}
