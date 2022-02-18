import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewAboutComponent } from 'src/app/about-info/view-about/view-about.component';

interface ActivateDialogData {
  name:string
  isActive: boolean;
  id: number
}

@Component({
  templateUrl: './activate.component.html',
  styles: [
  ]
})
export class ActivateComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<[ViewAboutComponent]>, @Inject(MAT_DIALOG_DATA) public data: ActivateDialogData) { }

  ngOnInit(): void {
  }

  confirm() {
    this.dialogRef.close({ message: 'ACTIVATE', id: this.data.id })
  };

  cancel() {
    this.dialogRef.close({ message: 'CANCEL', id: this.data.id })
  };

}
