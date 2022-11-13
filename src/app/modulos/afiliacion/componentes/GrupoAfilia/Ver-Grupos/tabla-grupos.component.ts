import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { IGruposAfiliados } from "app/modulos/afiliacion/interface/GrupoInterface";
import { AfiliacionService } from "app/modulos/afiliacion/services/afiliacion.service";
import { PlanillasAfiliacionComponent } from "./planillas-afiliacion/planillas-afiliacion.component";
import { PopUpFormAfiliaComponent } from "./pop-up-form-afilia/formPopUpafilia.component";
import { Subject, Observable } from "rxjs";
import Swal from "sweetalert2";
import { FormGrupoPopupComponent } from "../FormGrupo-popup/FromGru-popopup.component";
import { AppLoaderService } from "app/shared/services/app-loader/app-loader.service";
import { InfoCnePopUpComponent } from "../InfoCne-popup/infoCnePopUp/infoCnePopUp.component";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { UserModel } from "app/shared/models/user.model";
import { egretAnimations } from "app/shared/animations/egret-animations";

@Component({
  selector: "app-tabla-grupos",
  templateUrl: "./tabla-grupos.component.html",
  styleUrls: ["./tabla-grupos.component.scss"],
  animations: egretAnimations,
})
export class TablaGruposComponent implements OnInit {
  userLog$: Observable<UserModel>;
  usuarioRol: any;
  public lotes: IGruposAfiliados = [];
  private grupos$: Subject<IGruposAfiliados>;
  public items: any;
  private items$: Subject<any>;
  totalLotes: number;
  spinnerBuscar: boolean;
  cargarCard: boolean;
  btnVolver: boolean;
  cargarBarra: boolean;
  oclAnterior: boolean;
  cargando: boolean;
  buscarLte: boolean;
  private page$: Subject<number>;
  npage: number;
  nroLte: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private loader: AppLoaderService,
    private cdr: ChangeDetectorRef,
    public authServ: JwtAuthService,
    private afiliadoService: AfiliacionService
  ) {
    this.grupos$ = new Subject();
    this.items$ = new Subject();
    this.page$ = new Subject();
  }

  ngOnInit(): void {
    let usuario: any = this.authServ.user;
    this.usuarioRol = usuario.role;

    this.cargarGrupos();
    this.getGrupo$().subscribe((lot) => {
      this.lotes = lot;
      this.cargarBarra = true;
      this.cargarCard = true;
    });
    this.getPages$().subscribe((page) => {
      this.npage = page + 1;
    });
  }

  openDialogAfiliar(nroLote?, isNew?) {
    let title = isNew ? "Alta de Planilla" : "Modificar Planilla";
    const dialogoRef: MatDialogRef<any> = this.dialog.open(
      PopUpFormAfiliaComponent,
      {
        width: "90%",
        height: "80%",
        disableClose: false,
        data: { title, nroLote },
      }
    );
    dialogoRef.afterClosed().subscribe((res) => {
      if (res.length) {
        this.grupos$.next(res);
        this.router.navigate(["/afiliacion/lotes"]);
      }
      this.router.navigate(["/afiliacion/lotes"]);
    });
  }
  openDialogPlanillas(planillas?) {
    const dialogoRef: MatDialogRef<any> = this.dialog.open(
      PlanillasAfiliacionComponent,
      {
        width: "100%",
        height: "80%",
        disableClose: false,
        data: { planillas },
      }
    );
    dialogoRef.afterClosed().subscribe((res) => {
      if (res === "closed") {
        this.router.navigate(["/afiliacion/lotes"]);
      }
      this.router.navigate(["/afiliacion/lotes"]);
      this.cdr.markForCheck();
    });
  }

  cargarGrupos() {
    this.afiliadoService.getAllGrupos().subscribe((res: any) => {
      this.totalLotes = res.totalLote;
      this.grupos$.next(res.data);
      this.page$.next(res.page);
      this.cargando = true;
    });
  }

  getGrupo$(): Observable<IGruposAfiliados> {
    return this.grupos$.asObservable();
  }
  getPages$(): Observable<number> {
    return this.page$.asObservable();
  }

  siguiente() {
    this.cargando = false;
    this.afiliadoService.getAllGrupos(this.npage).subscribe((res: any) => {
      setTimeout(() => {
        this.grupos$.next(res.data);
        this.page$.next(res.page);
        this.oclAnterior = true;
        this.cargando = true;
      }, 1000);
    });
  }

  anterior() {
    this.cargando = false;

    let pagina = this.npage - 2;

    this.afiliadoService.getAllGrupos(pagina).subscribe((res: any) => {
      setTimeout(() => {
        this.grupos$.next(res.data);
        this.page$.next(res.page);
        this.cargando = true;
        if (pagina === 1) {
          this.oclAnterior = false;
          this.cargando = true;
        }
      }, 1000);
    });
  }
  filtLte() {
    this.buscarLte = true;
    this.btnVolver = true;
  }
  value() {
    var slider = document.getElementById("nroLte");
    var val = document.getElementById("nroLte");
  }
  volver() {
    this.buscarLte = false;
    this.btnVolver = false;
    this.nroLte = "";
    this.cargarGrupos();
  }

  cargar() {
    this.cargarCard = false;
    this.spinnerBuscar = true;
    this.afiliadoService.getOneLote(this.nroLte).subscribe((res: any) => {
      setTimeout(async () => {
        if (res.ok) {
          this.spinnerBuscar = false;
          this.buscarLte = true;
          this.cargarCard = true;
          this.btnVolver = true;
          this.nroLte = "";
          this.grupos$.next(res.lotenumero);
        } else {
          this.spinnerBuscar = false;
          await Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: `${res.msg}`,
          });
          this.volver();
        }
      }, 2000);
    });
  }

  //////Menu de Administracion de lotes perfil de ADM

  //PopUp Crear Lote
  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? "Crear lote de afiliación" : "Modificar datos del lote";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      FormGrupoPopupComponent,
      {
        width: "1020px",
        disableClose: true,
        data: { title: title, payload: { data, totalLote: this.totalLotes } },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        // If user press cancel
        return;
      }
      this.loader.open();
      if (isNew) {
        this.grupos$.next(res);
        this.totalLotes = res.length;
        this.loader.close();
      } else {
        this.grupos$.next(res);
        this.loader.close();
      }
    });
  }

  // PopUp Presentar Lote
  async presentarLote(row) {
    await Swal.fire({
      title: "Debe ingresar la fecha de presentación en la CNE",
      html: '<input type="date" id="fechaIngresoJunta" class="example-full-width" appearance="fill">',
      focusConfirm: false,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Presentar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let fechaPresentacion = (<HTMLInputElement>(
          document.getElementById("fechaIngresoJunta")
        )).value;

        let value: any = {
          estadoAfiliacion: "presentado",
          fechaIngresoJunta: fechaPresentacion,
        };
        let op = "presentar";
        this.afiliadoService
          .presentacionLte(value, row._id, op)
          .subscribe(async (res: any) => {
            if (res.ok) {
              await Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Información cargada con exito!",
                showConfirmButton: false,
                timer: 1500,
              });
              this.items$.next(res.data);
            } else {
              await Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Upsss..!",
                text: `${res.error}`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  }
  // PopUp Informacion Devolucion Junta Electoral
  async devolucionCNE(row) {
    await Swal.fire({
      title: "Debe ingresar la fecha de devolición de la CNE",
      html: '<input type="date" id="fechaRespuestaJunta" class="form-control" >',
      input: "textarea",
      inputLabel: "Observaciones",
      focusConfirm: false,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Siguiente",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let fechaRespuestaJunta = (<HTMLInputElement>(
          document.getElementById("fechaRespuestaJunta")
        )).value;
        let obserJunta = result.value;
        const estadoJunta = await Swal.fire({
          title: "Estado del lote presentado ante la CNE",
          input: "select",
          inputOptions: {
            aprobado: "Aprobado",
            rechazado: "Rechazado",
            observado: "Observado",
          },
          inputPlaceholder: "Seleccione una opción",
          showCancelButton: true,
          inputValidator: (value) => {
            return new Promise((resolve: any) => {
              if (value !== "") {
                resolve();
              } else {
                resolve("Debé seleccionar una opción");
              }
            });
          },
        });

        let value: any = {
          estadoAfiliacion: "devuelto CNE",
          estadoJunta: estadoJunta.value,
          fechaIngresoJunta: row.datosJusElc.fechaIngresoJunta,
          fechaRespuestaJunta: fechaRespuestaJunta,
          obserJunta: obserJunta,
        };
        let op = "infoCNE";

        this.afiliadoService
          .presentacionLte(value, row._id, op)
          .subscribe(async (res: any) => {
            if (res.ok) {
              await Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Información cargada con exito!",
                showConfirmButton: false,
                timer: 1500,
              });
              this.items$.next(res.data);
            } else {
              await Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Upsss..!",
                text: `${res.error}`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  }

  /// PopUp Ver Informacion de Que la junta envio del Lote
  verInfoCne(row) {
    let title = "Infomación, sobre la devolución de la CNE";
    let dialogRef: MatDialogRef<any> = this.dialog.open(InfoCnePopUpComponent, {
      width: "800px",
      disableClose: false,
      data: { title: title, payload: row },
    });
    //dialogRef.close();
  }

  ngOnDestroy() {}
}
