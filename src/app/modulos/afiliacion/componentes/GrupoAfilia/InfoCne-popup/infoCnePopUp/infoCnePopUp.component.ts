import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-infoCnePopUp",
  templateUrl: "./infoCnePopUp.component.html",
  styleUrls: ["./infoCnePopUp.component.scss"],
})
export class InfoCnePopUpComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InfoCnePopUpComponent>
  ) {}

  ngOnInit() {
    console.log(this.data);
  }

  cerrar() {
    this.dialogRef.close();
  }
}
