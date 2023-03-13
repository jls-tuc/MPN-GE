import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AfiliacionService } from "app/modulos/afiliacion/services/afiliacion.service";
import Swal from "sweetalert2";
import { ProvLocService } from "app/shared/services/prov-loc.service";

@Component({
  selector: "app-form-grupo-popup",
  templateUrl: "./FormGrupo-popup.component.html",
  styleUrls: ["./FormGrupo-popup.component.css"],
})
export class FormGrupoPopupComponent implements OnInit {
  public grupoAfiliadoForm: FormGroup;
  public minDate = new Date();
  public usuarios: any[] = [];
  private numero: any;
  localidades: any[] = [];
  events: string[] = [];
  estado: string[] = ["activo", "cerrado", "pausado"];
  guardar: boolean;
  btnSave: boolean = true;
  public filteredLocalidades;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormGrupoPopupComponent>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private afiliadoService: AfiliacionService,
    private provLocService: ProvLocService
  ) {
    this.numero = this.data.payload.totalLote + 1;

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
      numero: "",
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
        calle: [data ? data.lugarAfiliacion.calle : ""],
        numero: [data ? data.lugarAfiliacion.numero : "", ,],
        telefono: [data ? data.lugarAfiliacion.telefono : "", ,],
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
    this.grupoAfiliadoForm
      .get("lugarAfiliacion.localidad")
      .valueChanges.subscribe((response) => {
        console.log("Data is ", response);
        this.filterData(response);
      });
  }
  filterData(enteredData) {
    this.filteredLocalidades = this.localidades.filter((item) => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
    });
  }
  submit() {
    this.grupoAfiliadoForm.value.usuarioResponsable.nombreCompleto = `${this.grupoAfiliadoForm.value.usuarioResponsable.apellido}, ${this.grupoAfiliadoForm.value.usuarioResponsable.nombres}`;
    this.btnSave = false;
    this.guardar = true;
    setTimeout(() => {
      if (this.data.title !== "Modificar datos del lote") {
        this.afiliadoService
          .postGrupo(this.grupoAfiliadoForm.value)
          .subscribe(async (res: any) => {
            this.guardar = false;
            if (res.ok) {
              await Swal.fire({
                icon: "success",
                title: "Ok...",
                text: `El grupo de afiliación nro:${res.loteNro} , fue creado con exito `,
                timer: 3000,
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
            this.guardar = false;
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
    }, 2000);
  }

  cargarlocalidades = () => {
    this.provLocService.getLocalidades().subscribe((data: any) => {
      this.localidades = data;
      this.filteredLocalidades = data;
    });
  };
  cargarUsuarios = () => {
    this.afiliadoService.getAllUsuarios().subscribe((res: any) => {
      let usuarios = res.usr.filter((us) => us.role !== "admin");
      this.usuarios = usuarios;
    });
  };
}
