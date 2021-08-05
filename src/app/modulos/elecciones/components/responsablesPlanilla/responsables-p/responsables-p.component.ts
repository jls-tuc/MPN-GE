import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
  ViewChild,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { ReferentesService } from "app/modulos/elecciones/services/referentes.service";
import Swal from "sweetalert2";
import { PlanillaComponent } from "../../planilla/planilla/planilla.component";

@Component({
  selector: "app-responsables-p",
  templateUrl: "./responsables-p.component.html",
  styleUrls: ["./responsables-p.component.css"],
})
export class ResponsablesPComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  datosReferente: any = {};
  resPlanillas: {};
  listaColumnas: string[] = [
    "dni",
    "apellido",
    "nombre",
    "localidad",
    "telefono",
    "acciones",
  ];
  dataSource: MatTableDataSource<any>;
  sortedData: any[];
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ResponsablesPComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private referenteService: ReferentesService
  ) {}

  ngOnInit(): void {
    this.datosReferente = this.data.payload;
    //console.log("datosRef", this.datosReferente);
    this.getResPlanillas();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getResPlanillas() {
    const idRef: {} = `id=${this.datosReferente._id}`;
    this.referenteService.getResPById(idRef).subscribe((data: any) => {
      this.resPlanillas = data.resp;
      // console.log("dataRESP", this.resPlanillas);
      this.dataSource = new MatTableDataSource(data.resp);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cdr.markForCheck();
    });
  }
  cargarPlanilla(data?) {
    const dialogoRef: MatDialogRef<any> = this.dialog.open(PlanillaComponent, {
      width: "75%",
      disableClose: true,
      data: { data },
    });
    dialogoRef.keydownEvents().subscribe((event) => {
      if (event.key === "Escape") {
        this.ngOnInit();
        dialogoRef.close();
      }
    });

    dialogoRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
    });
    this.cdr.markForCheck();
  }
}
