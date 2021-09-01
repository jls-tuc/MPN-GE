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
  selector: "app-ver-planilla",
  templateUrl: "./ver-planilla.component.html",
  styleUrls: ["./ver-planilla.component.css"],
})
export class VerPlanillaComponent implements OnInit {
  userData$: Observable<UserModel>;
  datosUser: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  votosCargados: any = {};
  totalVotos: any = {};
  resPlanillas: any;
  listaColumnas: string[] = [
    "dni",
    "nombreCompleto",
    "telefono",
    "localidad",
    "establecimiento",
    "mesa",
    "voto",
  ];
  dataSource: MatTableDataSource<any>;
  sortedData: any[];
  public cargar_datos: boolean = false;
  constructor(
    @Optional() public dialogRef: MatDialogRef<VerPlanillaComponent>,
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
  async cargarDatosUs() {
    //console.log(this.data.data);
    if (this.data != null && this.data.data.role === "user-ref") {
      await this.cargarHtml(this.data.data);
      const consulta: any = `consulta=${"Referente"}&valor=${
        this.resPlanillas._id
      }`;
      this.cargarPlanilla(consulta);
    } else if (this.data != null && this.data.data.role === "user-resp") {
      await this.cargarHtml(this.data.data);
      const consulta: any = `consulta=${"Resplanilla"}&valor=${
        this.resPlanillas._id
      }`;
      this.cargarPlanilla(consulta);
    } else {
      if (this.datosUser.source._value.role === "user-ref") {
        //console.log("estoy");
        this.resPlanillas = {
          _id: this.datosUser.source._value.id,
          nombres: this.datosUser.source._value.nombres,
          apellido: this.datosUser.source._value.apellido,
          localidad: this.datosUser.source._value.localidad,
        };
        const consulta: {} = `consulta=${"Referente"}&valor=${
          this.resPlanillas._id
        }`;
        this.cargarPlanilla(consulta);
      } else if (this.datosUser.source._value.role === "user-coord") {
        this.resPlanillas = {
          _id: this.datosUser.source._value.id,
          nombres: this.datosUser.source._value.nombres,
          apellido: this.datosUser.source._value.apellido,
          localidad: this.datosUser.source._value.localidad,
        };
        const consulta: {} = `consulta=${"Coord"}&valor=${
          this.resPlanillas._id
        }`;
        this.cargarPlanilla(consulta);
      }
    }
  }

  cargarHtml(data) {
    if (data.role === "user-ref") {
      this.cargar_datos = true;
      this.resPlanillas = {
        _id: data._id,
        nombres: data.datosPersonales.nombres,
        apellido: data.datosPersonales.apellido,
        localidad: data.datosPersonales.localidad,
      };
      //console.log(this.resPlanillas);
    } else {
      this.cargar_datos = true;
      this.resPlanillas = {
        _id: data._id,
        nombres: data.nombres,
        apellido: data.apellido,
        localidad: data.localidad,
      };
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  cargarPlanilla(data?) {
    this.votoService.getVotosById(data).subscribe((res: any) => {
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
