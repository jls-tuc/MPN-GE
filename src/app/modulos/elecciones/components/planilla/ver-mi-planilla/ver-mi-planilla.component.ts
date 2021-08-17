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
import { UserModel } from "app/shared/models/user.model";
import { Observable } from "rxjs";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";

@Component({
  selector: 'app-ver-mi-planilla',
  templateUrl: './ver-mi-planilla.component.html',
  styleUrls: ['./ver-mi-planilla.component.scss']
})
export class VerMiPlanillaComponent implements OnInit {
  userData$: Observable<UserModel>;
  datosUser: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  votosCargados: any = {};
  totalVotos: any = {};
  resPlanillas: any;
  listaColumnas: string[] = ["dni", "nombreCompleto", "localidad", "telefono"];
  dataSource: MatTableDataSource<any>;
  sortedData: any[];
  public cargar_datos: boolean = false;
  constructor(
    @Optional() public dialogRef: MatDialogRef<VerMiPlanillaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public auhService: JwtAuthService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private votoService: VotoProvService,
    private router: Router
  ) {
    (this.userData$ = this.auhService.currentUserSubject.asObservable()),
      (this.datosUser = this.userData$);
  }

  ngOnInit(): void {
    this.cargarDatosUs();
  }
  cargarDatosUs() {

    if (this.datosUser.source._value.role === "user-ref") {
      this.resPlanillas = {
        _id: this.datosUser.source._value.id,
        nombres: this.datosUser.source._value.nombres,
        apellido: this.datosUser.source._value.apellido,
        localidad: this.datosUser.source._value.localidad,
        miplanilla: true,
      };
      const consulta: {} = `consulta=${"Referente"}&valor=${this.resPlanillas._id
        }`;
      this.cargarPlanilla(consulta);
    } else if (this.datosUser.source._value.role === "user-coord") {
      this.resPlanillas = {
        _id: this.datosUser.source._value.id,
        nombres: this.datosUser.source._value.nombres,
        apellido: this.datosUser.source._value.apellido,
        localidad: this.datosUser.source._value.localidad,
        miplanilla: true,
      };
      const consulta: {} = `consulta=${"Coord"}&valor=${this.resPlanillas._id
        }`;
      this.cargarPlanilla(consulta);
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cargarPlanilla(data?) {
    this.votoService.getVotosByIdUser(data).subscribe((res: any) => {
      if (res.ok) {
        // console.log(res);
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
