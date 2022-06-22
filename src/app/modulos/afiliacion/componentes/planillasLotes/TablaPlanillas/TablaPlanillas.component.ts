import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AfiliacionService } from "app/modulos/afiliacion/services/afiliacion.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ProvLocService } from "app/shared/services/prov-loc.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { VerInfoPopUpComponent } from "../verInfoPopUp/verInfoPopUp.component";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import Swal from "sweetalert2";
import moment from "moment";
moment.locale("es-us");

export interface planillaData {
  apellido: string;
  documento: string;
  estadoAf: string;
  fechaAfilia?: string;
  fechaBaja?: string;
  fechaNacimiento: string;
  genero: string;
  nombre: string;
  nroLte: string;
  obserBaja?: string;
  localidad?: string;
  ultDomicilio?: {
    calle?: string;
    dep?: string;
    distritoElec?: string;
    localidad?: string;
    nro?: string;
    partidoDepto?: string;
    piso?: string;
  };
}

@Component({
  selector: "app-TablaPlanillas",
  templateUrl: "./TablaPlanillas.component.html",
  styleUrls: ["./TablaPlanillas.component.scss"],
})
export class TablaPlanillasComponent implements AfterViewInit {
  public filtroForm: FormGroup;
  private dataSource$: Subject<any[]>;
  buscar: boolean;
  filtros: boolean;
  estados: string[] = ["pendiente", "afiliado", "baja", "rechazado", "todos"];
  generos: any = [
    { nombre: "masculino", op: "m" },
    { nombre: "femenino", op: "f" },
    { nombre: "otro", op: "o" },
    { nombre: "todos", op: "t" },
  ];
  localidades: any[] = [];
  filtro: any[] = [];
  displayedColumns: string[] = [
    "documento",
    "apellido",
    "nombre",
    "localidad",
    "estado",
    "opciones",
  ];
  dataSource: MatTableDataSource<planillaData>;

  @ViewChild("htmlData") htmlData!: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public dialog: MatDialog,
    private afiliacionService: AfiliacionService,
    private fb: FormBuilder,
    private provLocService: ProvLocService,
    private cdr: ChangeDetectorRef
  ) {
    this.dataSource$ = new Subject();
    this.buidFiltroForm();
    this.obtProvLoc();
    this.getDataSource$().subscribe((elemento) => {
      this.dataSource = new MatTableDataSource(elemento);
    });
  }

  public downloadAsPDF(): void {
    const fecha = moment().format("ll");
    let DATA: any = document.getElementById("htmlData");

    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL("image/png");
      let PDF = new jsPDF("p", "mm", "a4");
      let position = 5;
      PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
      PDF.save(`Mpn.:Planillas-${fecha}.pdf`);
    });
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "Planillas";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtProvLoc() {
    this.provLocService.getLocalidades().subscribe((data: any) => {
      this.localidades = data.data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  buidFiltroForm() {
    this.filtroForm = this.fb.group({
      localidad: "",
      estado: "",
      genero: "",
    });
  }

  async filtrar() {
    await this.afiliacionService
      .getPlanillas(this.filtroForm.value)
      .subscribe((res: any) => {
        this.dataSource$.next(res.planillas);
        this.buscar = true;
        this.filtros = false;
        this.ngAfterViewInit();
      });
  }

  activarBusqueda() {
    this.filtros = false;
    this.buscar = true;
  }
  activarFiltros() {
    this.buscar = false;
    this.filtros = true;
  }
  ocultarBarra() {
    this.buscar = false;
    this.filtros = false;
  }
  verInfoPopUp(planilla: any) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(VerInfoPopUpComponent, {
      width: "1020px",
      disableClose: false,
      data: { title: "Información Personal", payload: { planilla } },
    });
    dialogRef.afterClosed().subscribe((res) => {});
  }
  async cambiarEstadoPersona(planilla) {
    await Swal.fire({
      title: "Debe ingresar la fecha, con el cambio de estado",
      html: '<input type="date" id="fechaRespuestaJunta" class="form-control" >',
      input: "textarea",
      inputLabel: "Observaciones",
      focusConfirm: false,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Siguiente",
      inputValidator: (value) => {
        return new Promise((resolve: any) => {
          let fechaRespuestaJunta = (<HTMLInputElement>(
            document.getElementById("fechaRespuestaJunta")
          )).value;
          if (fechaRespuestaJunta !== "") {
            resolve();
          } else {
            resolve("Debé completar la fecha");
          }
        });
      },
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
            afiliado: "Aprobado",
            rechazado: "Rechazado",
            baja: "Baja",
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
        let value: any = {};
        let op: string;
        if (estadoJunta.value === "afiliado") {
          value = {
            nroLte: planilla.nroLte,
            documento: planilla.documento,
            fechaAfilia: fechaRespuestaJunta,
            estadoAf: estadoJunta.value,
            obserBaja: obserJunta,
          };
          op = "afiliado";
        } else {
          value = {
            nroLte: planilla.nroLte,
            documento: planilla.documento,
            fechaBaja: fechaRespuestaJunta,
            estadoAf: estadoJunta.value,
            obserBaja: obserJunta,
          };
          op = "baja/rechazo";
        }

        this.afiliacionService
          .updPlanilla(value, planilla.nroLte)
          .subscribe(async (res: any) => {
            if (res.ok) {
              this.filtrar();
              await Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Información cargada con exito!",
                showConfirmButton: false,
                timer: 1500,
              });
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
  getDataSource$(): Observable<any> {
    return this.dataSource$.asObservable();
  }
}
