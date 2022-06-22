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
import { generarPlanilla } from "../../../planillaPdf/planillaPdf";
import { PopUpFormAfiliaComponent } from "../pop-up-form-afilia/formPopUpafilia.component";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IPlanillaAfilia } from "app/modulos/afiliacion/interface/planillaAfilia";

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
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    console.log(this.data.planillas);
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
