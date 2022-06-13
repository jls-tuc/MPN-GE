import {
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

@Component({
  selector: "app-planillas-afiliacion",
  templateUrl: "./planillas-afiliacion.component.html",
  styleUrls: ["./planillas-afiliacion.component.scss"],
})
export class PlanillasAfiliacionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  sortedData: any[];
  planillas: any = {};
  listaColumnas: string[] = [
    "dni",
    "nombreCompleto",
    "localidad",
    "telefono",
    "opciones",
  ];

  constructor(
    @Optional() public dialogRef: MatDialogRef<PlanillasAfiliacionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private auth: JwtAuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPlanilla(this.data.planillas);
  }
  cargarPlanilla(planillas) {
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = planillas;
    this.planillas = planillas;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.markForCheck();
  }

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
