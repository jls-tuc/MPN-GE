import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.scss"],
})
export class MapaPopupComponent implements OnInit {
  datos: any;
  constructor(
    public dialogRef: MatDialogRef<MapaPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.datos = this.data.properties;
    //console.log(this.datos);
  }
}
