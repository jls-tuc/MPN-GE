import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  public afiliadoFrom: FormGroup;
  private dataSource$: Subject<any[]>;
  private dataSecc$: Subject<any[]>;

  searchSimple: boolean;
  searchAdv: boolean;
  searchDni: boolean;
  cargarContenedor: boolean;
  spinner: boolean;
  buscar: boolean;
  filtros: boolean = true;
  seccionales: any[];
  locPar: any[];
  estados: string[] = ["afiliado", "baja", "pendiente", "verificar"];
  generos: any = [
    { nombre: "femenino", op: "f" },
    { nombre: "masculino", op: "m" },
    { nombre: "otro", op: "X" },
    //{ nombre: "todos", op: "t" },
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
  dataForm: any = {
    seccional: "",
    localidad: "",
    seccion: "",
    circuito: "",
    estado: "",
    genero: "",
    profesion: "",
  };
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
    this.buidAfiliadoForm();
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
      seccional: ["", Validators.required],
      localidad: ["", Validators.required],
      seccion: "",
      circuito: "",
      estado: "",
      genero: "",
      profesion: "",
    });
  }
  buidAfiliadoForm() {
    this.afiliadoFrom = this.fb.group({
      afiliadoDni: [
        "",
        [Validators.required, Validators.minLength(7), Validators.maxLength(8)],
      ],
    });
  }

  async cargarSeccCirc() {
    await this.afiliacionService.getAllSecc().subscribe((res: any) => {
      if (res.ok) {
        this.seccionales = res.data;
      }
    });

    await this.pardonService.getSecCir().subscribe((res: any) => {
      this.secCir = res.secCir;
      this.cargarContenedor = true;
      this.spinner = false;
      this.filtros = false;
      this.cdr.markForCheck();
    });
  }

  cargarLocParj(value) {
    this.filtroForm.value.localidad = "";
    let loc = this.seccionales.find((elemnto) => elemnto.seccional === value);
    this.locPar = loc.localidades_parajes_comprende;
    this.cdr.markForCheck();
  }

  opBusquedas(event: any) {
    let { value } = event;

    switch (value) {
      case "simple":
        this.filtros = false;
        this.buscar = true;
        this.cargarContenedor = true;
        this.searchAdv = false;
        this.searchDni = false;
        this.searchSimple = true;
        this.filtroForm.reset(this.dataForm);
        this.afiliadoFrom.reset();
        this.cdr.markForCheck();
        break;
      case "avanzada":
        this.filtros = false;
        this.buscar = true;
        this.cargarContenedor = true;
        this.searchDni = false;
        this.searchSimple = true;
        this.searchAdv = true;
        this.afiliadoFrom.reset();
        this.cdr.markForCheck();
        break;
      case "dni":
        this.filtros = false;
        this.buscar = true;
        this.searchDni = true;
        this.searchSimple = false;
        this.searchAdv = false;
        this.filtroForm.reset(this.dataForm);
        this.ngAfterViewInit();
        break;

      default:
        break;
    }
  }

  async seccCir() {
    let cir = this.secCir.filter(
      (element) => element.seccion === this.filtroForm.value.seccion
    );
    this.circuitos = [...new Set(cir.map((item) => item.circuito))];
    this.cdr.detectChanges();
  }
  async buscarAfiliado() {
    this.spinner = true;
    await this.afiliacionService
      .getAfiliadoJunta(this.afiliadoFrom.value.afiliadoDni)
      .subscribe((res: any) => {
        if (res.ok) {
          this.dataSource$.next(res.data);
          this.spinner = false;
          this.buscar = true;
        } else {
          Swal.fire({
            title: "Resultado de la busqueda",
            icon: "warning",
            text: res.msg,
          });

          this.spinner = false;
          this.buscar = true;
        }
      });
  }

  async filtrar() {
    this.spinner = true;
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
        height: "800px",
        disableClose: false,
        data: { title: "Información del afiliado", payload: { planilla } },
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
            fechaBaja: "",
            estadoAf: estadoJunta.value,
            obserBaja: obserJunta,
          };
          op = "afiliado";
        } else {
          value = {
            nroLte: planilla.nroLte,
            documento: planilla.documento,
            fechaAfilia: planilla.fecha_afiliacion,
            fechaBaja: fechaRespuestaJunta,
            estadoAf: estadoJunta.value,
            obserBaja: obserJunta,
          };
          op = "baja";
        }

        this.afiliacionService
          .updEstAfiliado(value, planilla.documento)
          .subscribe(async (res: any) => {
            if (res.ok) {
              await Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Información cargada con exito!",
                showConfirmButton: false,
                timer: 1500,
              });
              this.dataSource$.next(res.data);
              this.spinner = false;
              this.buscar = true;
              this.ngAfterViewInit();
            } else {
              await Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Upsss..!",
                text: `${res.error}`,
                showConfirmButton: false,
                timer: 1500,
              });
              this.spinner = false;
              this.buscar = true;
              this.ngAfterViewInit();
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
  get dniAfiliado() {
    return this.afiliadoFrom.get("afiliadoDni");
  }

  ///////exportar resultados de la consulta

  async exportar(planilla: any) {
    let xlsFile = [];
    let totalGenero = {
      femenino: 0,
      masculino: 0,
      otro: 0,
    };
    for (let data of planilla) {
      if (data.genero === "m") {
        totalGenero.masculino++;
      }
      if (data.genero === "f") {
        totalGenero.femenino++;
      }
      if (data.genero === "o") {
        totalGenero.otro++;
      }

      let info = {
        seccion: data.seccion,
        cod_seccion: data.cod_seccion,
        circuito: data.circuito,
        cod_circuito: data.cod_circuito,
        documento: data.documento,
        tipo_documento: data.tipo_documento,
        apellido: data.apellido,
        nombre: data.nombre,
        genero: data.genero,
        estado_afiliacion: data.estado_afiliacion,
        fecha_afiliacion: data.fecha_afiliacion,
        clase: data.clase,
        fecha_nacimiento: data.fecha_nacimiento,
        domicilio: data.domicilio,
        fecha_domicilio: data.fecha_domicilio,
        profesion: data.profesion,
      };
      xlsFile.push(info);
    }
    xlsFile.push(totalGenero);

    this.afiliacionService.getExportacionExcel(xlsFile, [], "InfoSeccional");
  }
}
