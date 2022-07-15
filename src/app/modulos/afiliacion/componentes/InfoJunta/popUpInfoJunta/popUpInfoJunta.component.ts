import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
@Component({
  selector: "app-popUpInfoJunta",
  templateUrl: "./popUpInfoJunta.component.html",
  styleUrls: ["./popUpInfoJunta.component.scss"],
})
export class PopUpInfoJuntaComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopUpInfoJuntaComponent>
  ) {}

  ngOnInit() {}
}
