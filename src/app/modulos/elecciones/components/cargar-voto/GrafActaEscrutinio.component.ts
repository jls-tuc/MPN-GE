import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { UserModel } from "app/shared/models/user.model";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { Observable, Subject } from "rxjs";
import { CargarVotoService } from "../../services/cargar-voto.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { PopupComponent } from "./popup/popup/popup.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-GrafEscrutinio",
  templateUrl: "./GrafActaEscrutinio.component.html",
  styleUrls: ["./GrafActaEscrutinio.component.scss"],
})
export class GrafActaEscrutinioComponent implements OnInit {
  public localidadTest: Subject<any> = new Subject<any>();
  public escuelaObs: Subject<any> = new Subject<any>();
  public mesaObs: Subject<any> = new Subject<any>();
  userData$: Observable<UserModel>;
  datosUser: any;
  mesas = [];
  actasProv: any[];
  escuelas: any[];
  localidades: any = [];
  dataLocalidadSeleccionada: any = { localidad: "", resultados: {} };
  dataEscuelaSeleccionada: any = { escuela: "", resultados: {} };
  dataMesaSeleccionada: any = { mesa: "", resultados: {} };
  showEsc: boolean;
  showMesas: boolean;
  showGraficLoc: boolean;
  showEscGrafic: boolean;
  showMesaGrafic: boolean;
  localidadSeleccionada: string;
  escuelaSeleccionada: string;
  mesaSeleccionada: string;

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
    this.cargarActas();
  }

  cargarActas() {
    this.cargarVotoServ.getActasEscrutinios().subscribe((res: any) => {
      this.actasProv = res.data;
      console.log(this.actasProv);
      this.localidades = [...new Set(res.data.map((item) => item.localidad))];
    });
  }

  cargarEscuela() {
    this.showGraficLoc = true;
    let localidad: any = this.actasProv.find(
      (element) => element.localidad === this.localidadSeleccionada
    );

    this.dataLocalidadSeleccionada.localidad = localidad.localidad;
    this.dataLocalidadSeleccionada.resultados = localidad.resultadosGral;
    this.localidadTest.next(this.dataLocalidadSeleccionada);
    let escSeleccionada = this.actasProv.filter(
      (item) => item.localidad === this.localidadSeleccionada
    );
    this.escuelas = [
      ...new Set(escSeleccionada.map((item) => item.establecimiento)),
    ];
    this.showEsc = true;
  }

  cargarMesas() {
    this.showEscGrafic = true;
    this.showMesas = true;
    let escSeleccionada: any = this.actasProv.find(
      (item) => item.establecimiento === this.escuelaSeleccionada
    );
    this.dataEscuelaSeleccionada.escuela = escSeleccionada.establecimiento;
    this.dataEscuelaSeleccionada.resultados = escSeleccionada.resultadosGral;
    this.escuelaObs.next(this.dataEscuelaSeleccionada);
    this.mesas = escSeleccionada.mesas;
  }

  seleccionarMesa() {
    this.showMesaGrafic = true;

    let escSeleccionada: any = this.actasProv.find(
      (item) => item.establecimiento === this.escuelaSeleccionada
    );

    let mesaSelec = escSeleccionada.mesas.find(
      (element) => element.mesa === this.mesaSeleccionada
    );
    this.dataMesaSeleccionada.mesa = mesaSelec.mesa;
    this.dataMesaSeleccionada.resultados = mesaSelec.resultadoMesa;
    this.mesaObs.next(this.dataMesaSeleccionada);
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
