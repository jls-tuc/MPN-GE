import { T } from "@angular/cdk/keycodes";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { UserModel } from "app/shared/models/user.model";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { Observable } from "rxjs";
import { CargarVotoService } from "../../services/cargar-voto.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PopupComponent } from "./popup/popup/popup.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-cargar-voto",
  templateUrl: "./cargar-voto.component.html",
  styleUrls: ["./cargar-voto.component.scss"],
})
export class CargarVotoComponent implements OnInit {
  userData$: Observable<UserModel>;
  datosUser: any;
  mesas = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private cargarVotoServ: CargarVotoService,
    public auhService: JwtAuthService
  ) {
    (this.userData$ = this.auhService.currentUserSubject.asObservable()),
      (this.datosUser = this.userData$);
  }

  ngOnInit(): void {
    this.cargarEscuela();
  }

  cargarEscuela() {
    let usuario: {} = `usuario=${this.datosUser.source._value.usuario}`;

    this.cargarVotoServ.getEscuela(usuario).subscribe((resp: any) => {
      this.mesas = resp.data.mesas;
    });
  }

  openCargarOrden(mesa) {
    let title = "cargarVoto";
    const dialogoRef: MatDialogRef<any> = this.dialog.open(PopupComponent, {
      width: "50%",
      height: "35%",
      disableClose: true,
      data: { mesa, title },
    });
    dialogoRef.keydownEvents().subscribe((event) => {
      if (event.key === "Escape") {
        this.ngOnInit();
        dialogoRef.close();
      }
    });
    dialogoRef.afterClosed().subscribe((res) => {
      // console.log(res);
      if (res === "closed") {
        this.router.navigate(["/elecciones/cargarVoto"]);
      }
      this.router.navigate(["/elecciones/cargarVoto"]);
    });
    this.cdr.markForCheck();
  }

  verOrdenesCargadas(mesa) {
    let title = "verPlanilla";
    const dialogoRef: MatDialogRef<any> = this.dialog.open(PopupComponent, {
      width: "70%",
      height: "50%",
      disableClose: true,
      data: { mesa, title },
    });
    dialogoRef.keydownEvents().subscribe((event) => {
      if (event.key === "Escape") {
        this.ngOnInit();
        dialogoRef.close();
      }
    });
    dialogoRef.afterClosed().subscribe((res) => {
      // console.log(res);
      if (res === "closed") {
        this.router.navigate(["/elecciones/cargarVoto"]);
      }
      this.router.navigate(["/elecciones/cargarVoto"]);
    });
    this.cdr.markForCheck();
  }
}
