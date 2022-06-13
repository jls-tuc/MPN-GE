import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  ViewChildren,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AfiliacionService } from "app/modulos/afiliacion/services/afiliacion.service";
import { AppLoaderService } from "app/shared/services/app-loader/app-loader.service";
import { FormGrupoPopupComponent } from "../FormGrupo-popup/FromGru-popopup.component";
import { Observable, Subject } from "rxjs";
import Swal from "sweetalert2";
import { InfoCnePopUpComponent } from "../InfoCne-popup/infoCnePopUp/infoCnePopUp.component";

@Component({
  selector: "app-alta-grupo",
  templateUrl: "./alta-lote.component.html",
  styleUrls: ["./alta-lote.component.scss"],
})
export class AltaLoteComponent implements OnInit, OnDestroy {
  public items: any;
  private items$: Subject<any>;

  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private loader: AppLoaderService,
    private afiliadoService: AfiliacionService,
    private cdrf: ChangeDetectorRef
  ) {
    this.items$ = new Subject();
  }

  ngOnInit(): void {
    this.cargarTabla();
    this.getItems$().subscribe((elemento) => {
      this.items = elemento;
    });
  }
  openPopUp(data: any = {}, isNew?) {
    let title = isNew ? "Crear lote de afiliación" : "Modificar datos del lote";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      FormGrupoPopupComponent,
      {
        width: "1020px",
        disableClose: true,
        data: { title: title, payload: { data, totalLote: this.items.length } },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        // If user press cancel
        return;
      }
      this.loader.open();
      if (isNew) {
        this.items$.next(res);
        this.loader.close();
      } else {
        this.items$.next(res);
        this.loader.close();
      }
    });
  }

  ngOnDestroy() {}

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
  verInfoCne(row) {
    let title = "Infomación, sobre la devolución de la CNE";
    let dialogRef: MatDialogRef<any> = this.dialog.open(InfoCnePopUpComponent, {
      width: "800px",
      disableClose: false,
      data: { title: title, payload: row },
    });
    //dialogRef.close();
  }

  cargarTabla() {
    this.afiliadoService.getAllGrupos().subscribe((res: any) => {
      this.items$.next(res.data);
    });
  }
  getItems$(): Observable<any> {
    return this.items$.asObservable();
  }
}
