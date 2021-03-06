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
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { Observable } from "rxjs";
import { UserModel } from "app/shared/models/user.model";
import { MapaService } from "app/modulos/elecciones/services/mapa.service";

@Component({
  selector: "app-planilla",
  templateUrl: "./planilla.component.html",
  styleUrls: ["./planilla.component.scss"],
})
export class PlanillaComponent implements OnInit {
  userData$: Observable<UserModel>;
  datosUser: any;
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
  nombreCompleto: string;
  votoAdH: IvotoADH;
  cargando: boolean = false;
  constructor(
    @Optional() public dialogRef: MatDialogRef<PlanillaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,

    public auhService: JwtAuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private votoProvService: VotoProvService,
    private padronService: PadronesService,
    private mapaSerivice: MapaService
  ) {
    (this.userData$ = this.auhService.currentUserSubject.asObservable()),
      (this.datosUser = this.userData$);
    this.buildFirstForm();
    this.buildSecondForm();
    this.buildAfiliadoForm();
  }

  ngOnInit(): void {
    this.cargarDatosUs();
    //  console.log("datos", this.datosResPlanilla);
  }

  cargarDatosUs() {
    if (this.data != null) {
      this.cargar_datos = true;

      this.datosResPlanilla = this.data.data;
      // console.log(this.datosResPlanilla);

      //  console.log(this.data.data);
      if (this.data.data.role === "user-ref") {
        this.datosResPlanilla = {
          localidad: this.data.data.localidad,
          nombres: this.data.data.nombres,
          apellido: this.data.data.apellido,
          idCoordinador: this.data.data.idCoordinador,
          idReferente: this.data.data._id,
          idResPlanilla: "",
          role: this.data.data.role,
        };
      } else {
        this.datosResPlanilla = {
          localidad: this.data.data.localidad,
          nombres: this.data.data.nombres,
          apellido: this.data.data.apellido,
          idResPlanilla: this.data.data._id,
          idCoordinador: this.data.data.idCoordinador,
          idReferente: this.data.data.idReferente,
          role: this.data.data.role,
        };
      }
    } else {
      if (this.datosUser.source._value.role === "user-ref") {
        this.datosResPlanilla = {
          role: this.datosUser.source._value.role,
          _id: "",
          idCoordinador: this.datosUser.source._value.idCoordinador,
          idReferente: this.datosUser.source._value.id,
          idResPlanilla: "",
          nombres: this.datosUser.source._value.nombres,
          apellido: this.datosUser.source._value.apellido,
          localidad: this.datosUser.source._value.localidad,
        };
      } else if (this.datosUser.source._value.role === "user-coord") {
        this.datosResPlanilla = {
          role: this.datosUser.source._value.role,
          _id: "",
          idCoordinador: this.datosUser.source._value.id,
          idReferente: "",
          idResPlanilla: "",
          nombres: this.datosUser.source._value.nombres,
          apellido: this.datosUser.source._value.apellido,
          localidad: this.datosUser.source._value.localidad,
        };
      }
    }
  }

  buildFirstForm() {
    this.firstFormGroup = this.fb.group({
      dni: ["", Validators.required],
      sexo: ["", Validators.required],
    });
  }

  buildSecondForm(dataPadron?) {
    this.secondFormGroup = this.fb.group({
      nombre: [dataPadron ? dataPadron.nombre : ""],
      apellido: [dataPadron ? dataPadron.apellido : ""],
      clase: [dataPadron ? dataPadron.clase : ""],
      genero: [dataPadron ? dataPadron.genero : ""],
      telefono: [dataPadron ? dataPadron.telefono : ""],
      tipo_voto: ["Voto Adhesion"],
      circuito: [dataPadron ? dataPadron.circuito : ""],
      localidad: [dataPadron ? dataPadron.localidad : ""],
      dom_estableimiento: [dataPadron ? dataPadron.dom_estableimiento : ""],
      establecimiento: [dataPadron ? dataPadron.establecimiento : ""],
      mesa: [dataPadron ? dataPadron.mesa : ""],
      orden: [dataPadron ? dataPadron.orden : ""],
    });
  }
  buildAfiliadoForm(dataAfiliado?) {
    this.afiliadoFormGroup = this.fb.group({
      afiliado: [dataAfiliado ? dataAfiliado.afiliado : ""],
      fec_afiliacion: [dataAfiliado ? dataAfiliado.fec_afiliacion : ""],
    });
  }

  buscarDatos() {
    this.cargando = true;
    const params: {} = `documento=${
      this.firstFormGroup.get("dni").value
    }&sexo=${this.firstFormGroup.get("sexo").value}`;

    this.padronService.getPadronNqn(params).subscribe((res: any) => {
      if (res.ok) {
        this.cargando = false;
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
        this.cargando = false;
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
    //  console.log(`this.data`, this.data)
    if (this.data != null) {
      this.dialogRef.close();
    } else {
      this.router.navigate(["/elecciones"]);
    }
  }
  guardar() {
    this.nombreCompleto = `${this.secondFormGroup.get("apellido").value} ${
      this.secondFormGroup.get("nombre").value
    }`;
    this.votoAdH = {
      dni: this.firstFormGroup.get("dni").value,
      sexo: this.firstFormGroup.get("sexo").value,
      nombreCompleto: this.nombreCompleto,
      clase: this.secondFormGroup.get("clase").value,
      genero: this.secondFormGroup.get("genero").value,
      telefono: this.secondFormGroup.get("telefono").value,
      tipo_voto: this.secondFormGroup.get("tipo_voto").value,
      localidad: this.secondFormGroup.get("localidad").value,
      dom_estableimiento: this.secondFormGroup.get("dom_estableimiento").value,
      establecimiento: this.secondFormGroup.get("establecimiento").value,
      mesa: this.secondFormGroup.get("mesa").value,
      orden: this.secondFormGroup.get("orden").value,
      afiliado: this.afiliadoFormGroup.get("afiliado").value,
      resPlanilla: {
        idResPlanilla: this.datosResPlanilla.idResPlanilla,
        idCoordinador: this.datosResPlanilla.idCoordinador,
        idReferente: this.datosResPlanilla.idReferente,
      },
    };
    let esc: any = {
      esc: this.votoAdH.establecimiento,
      mesa: this.votoAdH.mesa,
    };
    // console.log("voto", this.votoAdH);

    this.votoProvService
      .postVotoProv(this.votoAdH)
      .subscribe(async (data: any) => {
        if (data.ok === true) {
          this.votoProvService
            .postVotoGraf(this.votoAdH)
            .subscribe(async (data: any) => {
              if (data.ok === true) {
                await Swal.fire(
                  "El voto fue cargado correctamente",
                  "Puede continuar",
                  "success"
                );
                await this.cerrarPopUP();
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
