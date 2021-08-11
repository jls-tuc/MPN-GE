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
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Router } from "@angular/router";
import { ReferentesService } from "app/modulos/elecciones/services/referentes.service";
import { PlanillaComponent } from "../../planilla/planilla/planilla.component";
import { VerPlanillaComponent } from "../../planilla/ver-planilla/ver-planilla.component";
import Swal from "sweetalert2";

@Component({
  selector: "app-responsables-p",
  templateUrl: "./responsables-p.component.html",
  styleUrls: ["./responsables-p.component.css"],
})
export class ResponsablesPComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  datosReferente: any = {};
  resPlanillas: any = {};
  listaColumnas: string[] = [
    "dni",
    "apellido",
    "nombre",
    "localidad",
    "telefono",
    "acciones",
  ];
  dataSource: any;
  sortedData: any[];
  constructor(
    public dialog: MatDialog,
    @Optional() public dialogRef: MatDialogRef<ResponsablesPComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private referenteService: ReferentesService
  ) {}

  ngOnInit(): void {
    //console.log("datosRef", this.datosReferente);
    this.getResPlanillas();
  }

  getResPlanillas() {
    this.datosReferente = this.data.payload;
    const idRef: {} = `id=${this.datosReferente._id}`;
    this.referenteService.getResPById(idRef).subscribe((data: any) => {
      this.resPlanillas = data.resp;
      this.dataSource = new MatTableDataSource();
      this.dataSource.data = this.resPlanillas;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cdr.markForCheck();
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //console.log(this.dataSource.filter);
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

  verVotos(data?) {
    const dialogoRef: MatDialogRef<any> = this.dialog.open(
      VerPlanillaComponent,
      {
        width: "75%",
        disableClose: true,
        data: { data },
      }
    );
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
