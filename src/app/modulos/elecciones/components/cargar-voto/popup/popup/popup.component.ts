import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { CargarVotoService } from "app/modulos/elecciones/services/cargar-voto.service";
import { UserModel } from "app/shared/models/user.model";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { Observable } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.scss"],
})
export class PopupComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  public ordenForm: FormGroup;
  user$: Observable<UserModel>;
  usurioLog: any;
  value = "Clear me";
  ordenes: any = [];
  datosForm: any = {};
  cargarPlanilla: boolean;
  cargarVotos: boolean;
  votosCargados: any = {};
  totalVotos: any = {};
  listaColumnas: string[] = ["orden", "voto"];
  dataSource: MatTableDataSource<any>;
  sortedData: any[];
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private auth: JwtAuthService,
    private cargarVotoServ: CargarVotoService
  ) {
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.usurioLog = this.user$;
    this.initForm();
  }

  ngOnInit(): void {
    //console.log(this.data);
    this.cargarHtml();
  }
  initForm(data?) {
    this.ordenForm = this.fb.group({
      mesa: [data ? data.mesa : ""],
      orden: ["", [Validators.required, Validators.maxLength(3)]],
      usuario: [data ? data.usuario : ""],
    });
  }

  cargarHtml() {
    if (this.data.title === "verPlanilla") {
      this.cargarPlanilla = true;
      let datoOrden = {
        usuario: this.usurioLog.source._value.usuario,
        mesa: this.data.mesa.mesa,
      };
      this.crearTabla(datoOrden);
    } else {
      this.cargarVotos = true;
      this.datosForm = {
        mesa: this.data.mesa.mesa,
        usuario: this.usurioLog.source._value.usuario,
      };

      this.initForm(this.datosForm);
      this.cdr.markForCheck();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  crearTabla(data?) {
    this.cargarVotoServ.getOrden(data).subscribe((res: any) => {
      if (res.ok) {
        if (res.msg) {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `${res.msg} `,
            showConfirmButton: false,
            timer: 3500,
          });
          this.cerrarPopUp();
        } else {
          this.votosCargados = res.mesa.orden;
          this.dataSource = new MatTableDataSource(this.votosCargados);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cdr.markForCheck();
        }
      }
    });
  }

  cerrarPopUp() {
    this.dialogRef.close("closed");
  }
  enviarVotos() {
    if (this.ordenForm.value.orden > this.data.mesa.orden) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `El orden Nº:${this.ordenForm.value.orden} no exite en la mesa`,
        showConfirmButton: false,
        timer: 3500,
      });
      this.cerrarPopUp();
    } else {
      this.ordenForm.value.orden = this.ordenForm.value.orden.toString();
      this.ordenes.push(this.ordenForm.value);
      this.cargarVotoServ
        .postOrden(this.ordenes)
        .subscribe(async (data: any) => {
          if (data.ok === true) {
            await Swal.fire(
              "El voto fue cargado correctamente",
              "Puede continuar",
              "success"
            );
            await this.cerrarPopUp();
          } else {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: `${data.msg}`,
              showConfirmButton: false,
              timer: 3500,
            });
            this.cerrarPopUp();
          }
        });
    }
  }

  get ordenNoValido() {
    return (
      this.ordenForm.get("orden").invalid && this.ordenForm.get("orden").touched
    );
  }
}
