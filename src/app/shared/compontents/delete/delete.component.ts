import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewProductsComponent } from 'src/app/products/view-products/view-products.component';

interface DeleteDialogData {
  name: string;
  id: number
}

@Component({
  templateUrl: './delete.component.html',
  styles: [
  ]
})
export class DeleteComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<[ViewProductsComponent]>, @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) { }

  ngOnInit(): void {
  }

  confirm() {
    this.dialogRef.close({ message: 'DELETE', id: this.data.id })
  };

  cancel() {
    this.dialogRef.close({ message: 'CANCEL', id: this.data.id })
  };

}
