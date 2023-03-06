import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
  ViewChild,
} from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import {
  generarInfoLote,
  generarPlanilla,
} from "../../../planillaPdf/planillaPdf";
import { PopUpFormAfiliaComponent } from "../pop-up-form-afilia/formPopUpafilia.component";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IPlanillaAfilia } from "app/modulos/afiliacion/interface/planillaAfilia";
import { AfiliacionService } from "app/modulos/afiliacion/services/afiliacion.service";
import moment from "moment";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
  selector: "app-planillas-afiliacion",
  templateUrl: "./planillas-afiliacion.component.html",
  styleUrls: ["./planillas-afiliacion.component.scss"],
})
export class PlanillasAfiliacionComponent implements AfterViewInit {
  dataSource: MatTableDataSource<planillaData>;

  listaColumnas: string[] = [
    "documento",
    "apellido",
    "nombre",
    "localidad",
    "telefono",
    "opciones",
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    @Optional() public dialogRef: MatDialogRef<PlanillasAfiliacionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private auth: JwtAuthService,
    private afiService: AfiliacionService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    //console.log(this.data.planillas);
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.data.planillas);
    this.paginator._intl.itemsPerPageLabel = "Planillas";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.markForCheck();
  }
  /* cargarPlanilla(planillas) {
    this.dataSource = new MatTableDataSource(planillas);
    this.planillas = planillas;
    this.paginator._intl.itemsPerPageLabel = "Planillas";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.markForCheck();
  } */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //console.log(this.dataSource.filter);
  }

  verPlanilla(value?) {
    let title = "Ver planilla";
    const dialogoRef: MatDialogRef<any> = this.dialog.open(
      PopUpFormAfiliaComponent,
      {
        width: "90%",
        height: "80%",
        disableClose: false,
        data: { value, title },
      }
    );
    dialogoRef.afterClosed().subscribe((res) => {
      if (res.length) {
        this.dialogRef.close();
        this.cdr.markForCheck();
      }
      this.dialogRef.close();
    });
  }
  //ver planillas presentas!!!!
  async planillaPresentacionPDF(value?) {
    let docImp = generarInfoLote(value, this.data.nroLte, this.data.fechaPres);

    pdfMake.createPdf(docImp).open();
  }

  async descargarPlanillasXLS(dataPlanilla?) {
    console.log(dataPlanilla);
    const datosProc = dataPlanilla.map( item => ({
      DNI: item.documento.toUpperCase(),
      APELLIDO: item.apellido.toUpperCase(),
      NOMBRE: item.nombre.toUpperCase(),
      GENERO: item.genero.toUpperCase(),
      FECHA_AFILIA: item.fechaAfilia,
      FORM_RENUNCIA: ""
    }));
    let listaMasculino = datosProc.filter(item => item.GENERO === 'M').sort((a,b) => a.DNI - b.DNI);
    listaMasculino = listaMasculino.map((item, index) => {
      const newItem = {NRO: index+1, ...item};
      delete newItem.GENERO;
      return newItem;
    });
    let listaFemenino = datosProc.filter(item => item.GENERO === 'F').sort((a,b) => a.DNI - b.DNI);
    listaFemenino = listaFemenino.map((item, index) => {
      const newItem = {NRO: index+1, ...item};
      delete newItem.GENERO;
      return newItem;
    });

    const columnas: string[] = ["NRO", "DNI", "APELLIDO", "NOMBRE", "FECHA_AFILIA", "FORM_RENUNCIA"]
    const header = [["NOMINA FICHAS DE AFILIACION MOVIMIENTO POPULAR NEUQUINO"]];
    this.afiService.getExportacionExcel2(listaFemenino, listaMasculino, header,columnas, `LOTE ${this.data.nroLte}`);
  }

  async generarPdf(planilla: IPlanillaAfilia) {
    let docDefinition = generarPlanilla(planilla);
    pdfMake.createPdf(docDefinition).open();
  }

  cerrarPopUP(value: string) {
    if (this.data != null) {
      this.dialogRef.close();
    } else {
      this.dialogRef.close();
    }
  }
}
