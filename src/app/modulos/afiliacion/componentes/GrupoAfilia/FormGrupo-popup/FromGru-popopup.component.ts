import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AfiliacionService } from "app/modulos/afiliacion/services/afiliacion.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-form-grupo-popup",
  templateUrl: "./FormGrupo-popup.component.html",
  styleUrls: ["./FormGrupo-popup.component.css"],
})
export class FormGrupoPopupComponent implements OnInit {
  public grupoAfiliadoForm: FormGroup;
  public minDate = new Date();
  public usuarios: any[] = [];
  private nro: any;
  localidades: any[] = [];
  events: string[] = [];
  estado: string[] = ["activo", "cerrado", "pausado"];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormGrupoPopupComponent>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private afiliadoService: AfiliacionService
  ) {
    this.nro = this.data.payload.totalLote + 1;

    this.cargarUsuarios();
    this.cargarlocalidades();
    this.buildItemForm();
  }

  ngOnInit() {
    this.data.title === "Modificar datos del lote" &&
      this.buildItemForm(this.data.payload.data);

    this.cdr.detectChanges();
  }

  buildItemForm(data?) {
    this.grupoAfiliadoForm = this.fb.group({
      nro: [
        data ? data.nro : this.nro,
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(1),
        ],
      ],
      usuarioResponsable: [data ? data.usuarioResponsable : ""],
      lugarAfiliacion: this.fb.group({
        localidad: [
          data ? data.lugarAfiliacion.localidad : "",
          [Validators.required],
        ],
        nombreEdificio: [
          data ? data.lugarAfiliacion.nombreEdificio : "",
          [Validators.required],
        ],
        calle: [data ? data.lugarAfiliacion.calle : "", [Validators.required]],
        numero: [
          data ? data.lugarAfiliacion.numero : "",
          [Validators.required],
        ],
        telefono: [
          data ? data.lugarAfiliacion.telefono : "",
          [Validators.required],
        ],
      }),
      datosJusElc: this.fb.group({
        fechaIngresoJunta: "",
        fechaRespuestaJunta: "",
        estadoJunta: "",
        obserJunta: "",
      }),
      fechaInicioAfiliacion: [
        data ? data.fechaInicioAfiliacion : "",
        [Validators.required],
      ],
      estadoAfiliacion: [
        data ? data.estadoAfiliacion : "",
        [Validators.required],
      ],
      fechaFinAfiliacion: [data ? data.fechaFinAfiliacion : ""],
    });
  }

  submit() {
    this.grupoAfiliadoForm.value.usuarioResponsable.nombreCompleto = `${this.grupoAfiliadoForm.value.usuarioResponsable.apellido}, ${this.grupoAfiliadoForm.value.usuarioResponsable.nombres}`;

    if (this.data.title !== "Modificar datos del lote") {
      this.afiliadoService
        .postGrupo(this.grupoAfiliadoForm.value)
        .subscribe(async (res: any) => {
          console.log(res);
          if (res.ok) {
            await Swal.fire({
              icon: "success",
              title: "Ok...",
              text: "El grupo de afiliación, fue creado con exito",
            });
            this.grupoAfiliadoForm.reset();
            this.dialogRef.close(res.data);
          } else {
            await Swal.fire({
              icon: "error",
              title: "Oop...",
              text: "Verificar el estado de la conexión",
            });
            this.dialogRef.close();
          }
        });
    } else {
      this.afiliadoService
        .updGrupo(this.grupoAfiliadoForm.value, this.data.payload.data._id)
        .subscribe(async (res: any) => {
          if (res.ok) {
            await Swal.fire({
              icon: "success",
              title: "Ok...",
              text: "Los datos, fueron modificados con exito",
            });
            this.grupoAfiliadoForm.reset(res.data);
            this.dialogRef.close(res.data);
          } else {
            await Swal.fire({
              icon: "error",
              title: "Oop...",
              text: "Verificar el estado de la conexión",
            });
            this.dialogRef.close();
          }
        });
    }
  }

  cargarlocalidades = () => {
    this.afiliadoService.getAllLocaNqn().subscribe((resp: any) => {
      this.localidades = resp.data;
    });
  };
  cargarUsuarios = () => {
    this.afiliadoService.getAllUsuarios().subscribe((res: any) => {
      this.usuarios = res.usr;
    });
  };
}
