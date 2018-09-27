import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<InfoPopupComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }
}
