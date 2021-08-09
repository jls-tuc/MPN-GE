import {
  Component,
  ChangeDetectorRef,
  OnInit,
  Inject,
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
import { VotoProvService } from "../../../services/voto-prov.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-ver-planilla",
  templateUrl: "./ver-planilla.component.html",
  styleUrls: ["./ver-planilla.component.css"],
})
export class VerPlanillaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  votosCargados: any = {};
  totalVotos: any = {};
  resPlanillas: any;
  listaColumnas: string[] = ["dni", "nombreCompleto", "localidad", "telefono"];
  dataSource: MatTableDataSource<any>;
  sortedData: any[];
  constructor(
    public dialogRef: MatDialogRef<VerPlanillaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private votoService: VotoProvService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resPlanillas = this.data.data;
    this.cargarPlanilla(this.resPlanillas);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cargarPlanilla(data?) {
    let id = `id=${data._id}`;
    this.votoService.getVotosById(id).subscribe((res: any) => {
      if (res.ok) {
        this.votosCargados = res.votosUnicos;
        this.totalVotos = res.totalV;
        this.dataSource = new MatTableDataSource(this.votosCargados);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cdr.markForCheck();
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Por favor, verifique los datos ingresados.",
          showConfirmButton: false,
          timer: 3500,
        });
      }
    });
  }
}
