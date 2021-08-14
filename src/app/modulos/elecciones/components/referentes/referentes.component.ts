import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ReferentesService } from "../../services/referentes.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { ReferentePopupComponent } from "./popUp/referente-popup.component";
import { ResponsablesPComponent } from "../responsablesPlanilla/responsables-p/responsables-p.component";
import { filter } from "rxjs/operators";
import { PlanillaComponent } from "../planilla/planilla/planilla.component";
import { Observable } from "rxjs";
import { UserModel } from "app/shared/models/user.model";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { VerPlanillaComponent } from "../planilla/ver-planilla/ver-planilla.component";

@Component({
  selector: "app-referentes",
  templateUrl: "./referentes.component.html",
  styleUrls: ["./referentes.component.scss"],
})
export class ReferentesComponent implements OnInit {
  user$: Observable<UserModel>;
  users = [];
  usurioLog: any;
  usLogRole: any;
  constructor(
    private referenteService: ReferentesService,
    private auth: JwtAuthService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.usurioLog = this.user$;
    this.usLogRole = this.usurioLog.source._value.role;
    // console.log(`this.usurioLog`, this.usurioLog.source._value);
    //console.log(`this.role`, this.usLogRole);
  }

  ngOnInit(): void {
    // this.cargarReferentes();
    this.mostarCard();
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
        width: "75%",

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

  verPlanillas(data?) {
    const dialogoRef: MatDialogRef<any> = this.dialog.open(
      VerPlanillaComponent,
      {
        width: "75%",
        disableClose: true,
        data: { data },
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

  mostarCard() {
    //console.log(`Estoy cardddp`);
    if (this.usurioLog.source._value.role === "user-coord") {
      this.cargarReferentes();
    } else if (this.usurioLog.source._value.role === "user-ref") {
      //console.log(`Estoy resp`);
      this.cargarResponsables();
    } else {
      // console.log(`Estoy planilla`);
      this.cargarPlanillero();
    }
  }

  async cargarReferentes() {
    await this.referenteService.getReferente().subscribe((res: any) => {
      this.users = res.resp.filter(
        (data) =>
          data.idCoordinador === this.usurioLog.source._value.id &&
          data.role === "user-ref"
      );
      //  console.log("users", this.users);
    });
  }
  async cargarResponsables() {
    await this.referenteService.getReferente().subscribe((res: any) => {
      this.users = res.resp.filter(
        (data) => data.idReferente === this.usurioLog.source._value.id
      );
    });
  }
  cargarPlanillero() {
    this.referenteService.getReferente().subscribe((res: any) => {
      //      console.log(res);
      this.users = res.resp.filter(
        (data) => data._id === this.usurioLog.source._value.id
      );
    });
  }
}
