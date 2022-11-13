import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-popupCircuitos",
  templateUrl: "./popupCircuitos.component.html",
  styleUrls: ["./popupCircuitos.component.css"],
})
export class PopupCircuitosComponent implements OnInit {
  datos: any;
  escuelas: any;
  constructor(
    public dialogRef: MatDialogRef<PopupCircuitosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.datos = this.data.properties;

    this.escuelas = JSON.parse(this.datos.escuelas);
  }
}
