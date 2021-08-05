import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { PadronesService } from "app/modulos/elecciones/services/padrones.service";
import { ReferentesService } from "app/modulos/elecciones/services/referentes.service";
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
  votoAdH: {};
  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private referenteService: ReferentesService,
    private padronService: PadronesService
  ) {
    this.buildFirstForm();
    this.buildSecondForm();
    this.buildAfiliadoForm();
  }

  ngOnInit(): void {}
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
          position: "top-end",
          icon: "warning",
          title: `${res.msg}`,
          showConfirmButton: false,
          timer: 3500,
        });
      }
    });
  }

  guardar() {}
}
