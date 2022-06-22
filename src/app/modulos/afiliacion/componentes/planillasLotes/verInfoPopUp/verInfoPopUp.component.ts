import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-verInfoPopUp",
  templateUrl: "./verInfoPopUp.component.html",
  styleUrls: ["./verInfoPopUp.component.scss"],
})
export class VerInfoPopUpComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VerInfoPopUpComponent>
  ) {}

  ngOnInit() {}
}
