import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AfiliacionService } from "app/modulos/afiliacion/services/afiliacion.service";
import { PadronesService } from "app/modulos/elecciones/services/padrones.service";
import { profesiones, secciones } from "app/shared/helpers/camposFiltros";
import { Observable } from "rxjs";
import { Subject } from "rxjs/internal/Subject";
import { ChangeDetectorRef } from "@angular/core";
import Swal from "sweetalert2";
import { PopUpInfoJuntaComponent } from "../popUpInfoJunta/popUpInfoJunta.component";

@Component({
  selector: "app-tablaInfoJunta",
  templateUrl: "./tablaInfoJunta.component.html",
  styleUrls: ["./tablaInfoJunta.component.scss"],
})
export class TablaInfoJuntaComponent implements AfterViewInit {
  public filtroForm: FormGroup;
  private dataSource$: Subject<any[]>;
  private dataSecc$: Subject<any[]>;
  cargarContenedor: boolean;
  spinner: boolean;
  buscar: boolean;
  filtros: boolean = true;
  estados: string[] = ["afiliado", "baja", "pendiente", "todos", "verificar"];
  generos: any = [
    { nombre: "femenino", op: "f" },
    { nombre: "masculino", op: "m" },
    { nombre: "otro", op: "x" },
    { nombre: "todos", op: "t" },
  ];
  circuitos: any[];
  secCir: any[] = [];
  secciones: any[] = secciones;
  profesiones: string[] = profesiones;
  filtro: any[] = [];
  displayedColumns: string[] = [
    "seccion",
    "circuito",
    "documento",
    "apellido",
    "nombre",
    "estado",
    "opciones",
  ];
  dataSource: MatTableDataSource<any>;

  @ViewChild("htmlData") htmlData!: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public dialog: MatDialog,
    private pardonService: PadronesService,
    private afiliacionService: AfiliacionService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.cargarSeccCirc();
    this.dataSource$ = new Subject();
    this.dataSecc$ = new Subject();
    this.buidFiltroForm();
    this.getDataSource$().subscribe((elemento) => {
      this.dataSource = new MatTableDataSource(elemento);
    });
  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = "Planillas";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
      seccion: "",
      circuito: "",
      estado: "",
      genero: "",
      profesion: "",
    });
  }

  async cargarSeccCirc() {
    await this.pardonService.getSecCir().subscribe((res: any) => {
      this.secCir = res.secCir;
      this.cargarContenedor = true;
      this.spinner = false;
      this.filtros = false;
      this.cdr.markForCheck();
    });
  }

  async seccCir() {
    let cir = this.secCir.filter(
      (element) => element.seccion === this.filtroForm.value.seccion
    );
    this.circuitos = [...new Set(cir.map((item) => item.circuito))];
    this.cdr.detectChanges();
  }

  async filtrar() {
    await this.pardonService
      .getAfFiltro(this.filtroForm.value)
      .subscribe((res: any) => {
        this.dataSource$.next(res.data);
        this.spinner = false;
        this.buscar = true;

        this.ngAfterViewInit();
      });
  }

  activarBusqueda() {
    this.filtros = false;
    this.buscar = true;
  }
  activarFiltros() {
    this.spinner = true;
    this.buscar = false;
    this.filtros = true;
  }
  ocultarBarra() {
    this.buscar = false;
    this.filtros = false;
  }
  verInfoPopUp(planilla: any) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      PopUpInfoJuntaComponent,
      {
        width: "1020px",
        disableClose: false,
        data: { title: "Información Personal", payload: { planilla } },
      }
    );
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
  getDataSecc$(): Observable<any> {
    return this.dataSecc$.asObservable();
  }
}
