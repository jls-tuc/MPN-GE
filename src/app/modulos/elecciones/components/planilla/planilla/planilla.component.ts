import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { VotoProvService } from "app/modulos/elecciones/services/voto-prov.service";
import { PadronesService } from "app/modulos/elecciones/services/padrones.service";
import { IvotoADH } from "app/modulos/elecciones/interfaces/votosAdh";
import Swal from "sweetalert2";
@Component({
  selector: "app-planilla",
  templateUrl: "./planilla.component.html",
  styleUrls: ["./planilla.component.scss"],
})
export class PlanillaComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  afiliadoFormGroup: FormGroup;
  public ocultarBusqueda = false;
  public cargar_datos: boolean = false;
  public buscar_datos: boolean = true;
  public cargarRef: boolean = false;
  sexo: string[] = ["F", "M"];
  datosPadronNqn: {};
  datosAfiliados: {};
  datosResPlanilla: any;
  votoAdH: IvotoADH;
  constructor(
    public dialogRef: MatDialogRef<PlanillaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private votoProvService: VotoProvService,
    private padronService: PadronesService
  ) {
    this.buildFirstForm();
    this.buildSecondForm();
    this.buildAfiliadoForm();
  }

  ngOnInit(): void {
    this.datosResPlanilla = this.data.data;
    // console.log("datos", this.datosResPlanilla);
  }
  buildFirstForm() {
    this.firstFormGroup = this.fb.group({
      dni: ["", Validators.required],
      sexo: ["", Validators.required],
    });
  }

  buildSecondForm(dataPadron?) {
    this.secondFormGroup = this.fb.group({
      nombreCompleto: [dataPadron ? dataPadron.apellido_nombre : ""],
      clase: [dataPadron ? dataPadron.clase : ""],
      genero: [dataPadron ? dataPadron.genero : ""],
      telefono: [dataPadron ? dataPadron.telefono : ""],
      tipo_voto: ["Voto Adhesion"],
      circuito: [dataPadron ? dataPadron.circuito : ""],
    });
  }
  buildAfiliadoForm(dataAfiliado?) {
    this.afiliadoFormGroup = this.fb.group({
      afiliado: [dataAfiliado ? dataAfiliado.afiliado : ""],
      fec_afiliacion: [dataAfiliado ? dataAfiliado.fec_afiliacion : ""],
    });
  }

  buscarDatos() {
    const params: {} = `documento=${
      this.firstFormGroup.get("dni").value
    }&sexo=${this.firstFormGroup.get("sexo").value}`;

    this.padronService.getPadronProv(params).subscribe((res: any) => {
      if (res.ok) {
        this.ocultarBusqueda = true;
        this.datosPadronNqn = res.data;
        this.buildSecondForm(this.datosPadronNqn);
        this.padronService.getAfiliado(params).subscribe((res: any) => {
          if (res.ok) {
            let padronAfiliados = {
              afiliado: "Es afiliado al MPN",
              fec_afiliacion: res.data.fec_afiliacion,
            };
            this.buildAfiliadoForm(padronAfiliados);
          } else {
            let padronAfiliados = {
              afiliado: "No es afiliado al MPN",
            };
            this.buildAfiliadoForm(padronAfiliados);
          }
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: `${res.msg}`,
          showConfirmButton: false,
          timer: 3500,
        });
      }
    });
  }
  cerrarPopUP() {
    this.dialogRef.close();
  }
  guardar() {
    this.votoAdH = {
      dni: this.firstFormGroup.get("dni").value,
      sexo: this.firstFormGroup.get("sexo").value,
      nombreCompleto: this.secondFormGroup.get("nombreCompleto").value,
      clase: this.secondFormGroup.get("clase").value,
      genero: this.secondFormGroup.get("genero").value,
      telefono: this.secondFormGroup.get("telefono").value,
      tipo_voto: this.secondFormGroup.get("tipo_voto").value,
      circuito: this.secondFormGroup.get("circuito").value,
      afiliado: this.afiliadoFormGroup.get("afiliado").value,
      fec_afiliacion: this.afiliadoFormGroup.get("fec_afiliacion").value,
      resPlanilla: {
        idResPlanilla: this.datosResPlanilla._id,
      },
    };
    //console.log("voto", this.votoAdH);

    this.votoProvService
      .postVotoProv(this.votoAdH)
      .subscribe(async (data: any) => {
        if (data.ok === true) {
          await Swal.fire(
            "El usuario fue cargado correctamente",
            "Puede continuar",
            "success"
          );
          await this.dialogRef.close();
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `${data.msg}`,
            showConfirmButton: false,
            timer: 3500,
          });
        }
      });
  }
}
