import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ReferentesService } from "../../services/referentes.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { ReferentePopupComponent } from "./popUp/referente-popup.component";
import { ResponsablesPComponent } from "../responsablesPlanilla/responsables-p/responsables-p.component";
import { filter } from "rxjs/operators";
import { PlanillaComponent } from "../planilla/planilla/planilla.component";

@Component({
  selector: "app-referentes",
  templateUrl: "./referentes.component.html",
  styleUrls: ["./referentes.component.scss"],
})
export class ReferentesComponent implements OnInit {
  users = [];
  constructor(
    private referenteService: ReferentesService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarReferentes();
  }

  openDialog(data?) {
    //  console.log("data", data);
    this.dialog.open(ReferentePopupComponent, {
      width: "70%",
      data: { data },
    });
  }

  openDialogResPlanillas(data?) {
    const title = "Responsables de planillas asignados";
    const dialogoRef: MatDialogRef<any> = this.dialog.open(
      ResponsablesPComponent,
      {
        width: "70%",

        disableClose: true,
        data: { title, payload: data },
      }
    );
    dialogoRef.keydownEvents().subscribe((event) => {
      if (event.key === "Escape") {
        this.ngOnInit();
        dialogoRef.close();
      }
    });

    dialogoRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
    this.cdr.markForCheck();
  }

  openCargarPlanilla(data?) {
    const dialogoRef: MatDialogRef<any> = this.dialog.open(PlanillaComponent, {
      width: "70%",

      disableClose: true,
      data: { data },
    });
    dialogoRef.keydownEvents().subscribe((event) => {
      if (event.key === "Escape") {
        this.ngOnInit();
        dialogoRef.close();
      }
    });

    dialogoRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
    this.cdr.markForCheck();
  }

  cargarReferentes() {
    this.referenteService.getReferente().subscribe((res: any) => {
      this.users = res.resp.filter((data) => data.role === "user-ref");
      //  console.log("users", this.users);
    });
  }
}
