import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Iusuario } from "app/modulos/elecciones/interfaces/usuario.interfaces";
import { ReferentesService } from "app/modulos/elecciones/services/referentes.service";
import { ProvLocService } from "app/shared/services/prov-loc.service";
import { ValidarPersonaService } from "app/shared/services/renaper/validar.persona.service";

import Swal from "sweetalert2";
import { ReferentesComponent } from "../referentes.component";

@Component({
  selector: "app-referente-popup",
  templateUrl: "./referente-popup.component.html",
  styleUrls: ["./referente-popup.component.scss"],
})
export class ReferentePopupComponent implements OnInit {
  edata: string = "referente";
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  sexo: string[] = ["F", "M"];
  tipoReferente = [
    { tipo: "Referente", role: "USER-REF" },
    { tipo: "Responsable de planilla", role: "USER-RESP" },
  ];
  idReferente: string;
  role: string;
  idReferentes: any[] = [];
  referentes: string[];
  datosRenaper: {};
  referenteForm: Iusuario;
  usuarioRol: any = {};
  public provLoc: any[] = [];
  localidades: any[] = [];
  public provincia: any[] = [];
  public ocultarBusqueda = false;
  public cargar_datos: boolean = false;
  public buscar_datos: boolean = true;
  public cargarRef: boolean = false;
  public ocultarPaso: boolean = false;

  constructor(
    @Optional() public dialogRef: MatDialogRef<ReferentePopupComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private ValidarPersona: ValidarPersonaService,
    private provLocService: ProvLocService,
    private referenteService: ReferentesService
  ) {
    this.dataPForm();
    this.userForm();
  }

  ngOnInit() {
    this.obtProvLoc();
    this.cargarReferentes();
    this.usuarioRol = this.data.data;
  }

  dataPForm(data?) {
    this.secondFormGroup = this.fb.group({
      nombres: [data ? data.nombres : ""],
      apellido: [data ? data.apellido : ""],
      dni: [
        data ? data.dni : "",
        [Validators.required, Validators.maxLength(8)],
      ],
      sexo: [data ? data.sexo : "", [Validators.required]],
      foto: [data ? data.foto : ""],
      provincia: [data ? data.ciudad : ""],
      localidad: [data ? data.ciudad : ""],
      calle: [data ? data.calle : ""],
      numero: [data ? data.numero : ""],
      email: [
        "",
        [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")],
      ],
      telefono: [""],
    });
  }
  userForm(data?) {
    this.firstFormGroup = this.fb.group({
      usuario: [data ? data.dni : ""],
      password: [data ? this.getPassword(data.nombres.toLowerCase()) : ""],
      activo: [true],
      fechaAltaUsuario: [""],
      fechaBajaUsuario: [null],
      lastLogin: [""],
      role: ["", [Validators.required]],
      idReferente: [{ value: "", disabled: true }],
    });
  }

  cargarReferentes() {
    this.referenteService.getReferente().subscribe((res: any) => {
      let usuarios = res.data;
      this.idReferentes = usuarios.filter((res) => res.role === "user-ref");
      //  console.log("res", this.idReferentes);
    });
  }

  obtProvLoc() {
    this.provLocService.getProvLocalidades().subscribe((data: any) => {
      this.provLoc = data.data;
      this.provincia = [
        ...new Set(this.provLoc.map((item) => item.provincia_nombre)),
      ];
    });
  }

  provSelect(e?: any) {
    this.localidades = this.provLoc.filter(
      (data) => data.provincia_nombre === e
    );
    this.ngOnInit();
    this.cdr.detectChanges();
  }
  mostarRef(e?: any) {
    if (e === "USER-RESP") {
      this.firstFormGroup.patchValue({ role: e });
      this.cargarRef = true;
      this.campoIdReferente.enable();
    } else {
      this.cargarRef = false;
      this.campoIdReferente.disable();
      this.campoIdReferente.reset();
    }
  }

  obtRef(e?) {
    this.firstFormGroup.patchValue({ idReferente: e });
  }
  cerrarPopUP() {
    this.dialogRef.close();
  }
  async buscarDNI() {
    const params = `dni=${this.secondFormGroup.get("dni").value}&sexo=${
      this.secondFormGroup.get("sexo").value
    }`;

    this.ValidarPersona.getPersonaRenaper(params).subscribe(
      async (data: any) => {
        if (data.ID_TRAMITE_PRINCIPAL !== 0) {
          this.ocultarBusqueda = true;
          this.datosRenaper = data;
          data.dni = this.secondFormGroup.get("dni").value;
          data.sexo = this.secondFormGroup.get("sexo").value;
          console.log("data", data);
          this.dataPForm(data);
          this.userForm(data);
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "Por favor, verifique los datos ingresados.",
            showConfirmButton: false,
            timer: 3500,
          });
        }
      }
    );
  }

  guardar() {
    if (this.usuarioRol.role === "user-ref") {
      this.idReferente = this.usuarioRol._id;
      this.role = "USER-RESP";
    } else {
      this.role = "USER-REF";
    }
    this.referenteForm = {
      usuario: this.firstFormGroup.get("usuario").value,
      password: this.firstFormGroup.get("password").value,
      activo: this.firstFormGroup.get("activo").value,
      fechaAltaUsuario: this.firstFormGroup.get("fechaAltaUsuario").value,
      fechaBajaUsuario: this.firstFormGroup.get("fechaBajaUsuario").value,
      lastLogin: this.firstFormGroup.get("lastLogin").value,
      role: this.role,
      referentes: { idReferente: this.idReferente },
      datosPersonales: {
        nombres: this.secondFormGroup.get("nombres").value,
        apellido: this.secondFormGroup.get("apellido").value,
        dni: this.secondFormGroup.get("dni").value,
        sexo: this.secondFormGroup.get("sexo").value,
        calle: this.secondFormGroup.get("calle").value,
        foto: this.secondFormGroup.get("foto").value,
        numero: this.secondFormGroup.get("numero").value,
        provincia: this.secondFormGroup.get("provincia").value,
        localidad: this.secondFormGroup.get("localidad").value,
        email: this.secondFormGroup.get("email").value,
        telefono: this.secondFormGroup.get("telefono").value,
      },
    };
    console.log(`this.referenteForm`, this.referenteForm);

    /* this.pacienteForm.patchValue({
        direccion: `${
          this.pacienteForm.get("datos_Seguimiento.numero").value
        } ${this.pacienteForm.get("datos_Seguimiento.calle").value} ${
          this.pacienteForm.get("datos_Seguimiento.localidad").value
        } Neuquen`,
      }); */
    //TODO:Para cargar la Geo Location
    /*  const datos = this.referenteForm.value;
      console.log("datos", datos); */
    this.referenteService
      .crearRefernte(this.referenteForm)
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

  getPassword(nombre: string) {
    let pass: any = nombre.split(" ");
    let newPass = pass[0] + "Elecion2021";
    return newPass;
  }
  /* get dniNoValido() {
    return (
      this.secondFormGroup.get("dni").invalid &&
      this.secondFormGroup.get("dni").touched
    );
  } */

  get sexoNoValido() {
    return (
      this.secondFormGroup.get("sexo").invalid &&
      this.secondFormGroup.get("sexo").touched
    );
  }

  get campoTelefono() {
    return this.secondFormGroup.get("telefono");
  }
  get campoCalle() {
    return this.secondFormGroup.get("calle");
  }
  get campoNumero() {
    return this.secondFormGroup.get("numero");
  }

  get campoDepto() {
    return this.secondFormGroup.get("dpto");
  }
  get campoLocalidad() {
    return this.secondFormGroup.get("localidad");
  }

  get campoIdReferente() {
    return this.firstFormGroup.get("idReferente");
  }

  get campoRoleNoValido() {
    return (
      this.firstFormGroup.get("role").invalid &&
      this.firstFormGroup.get("role").touched
    );
  }
  get campoIdNoValido() {
    return (
      this.firstFormGroup.get("idReferente").invalid &&
      this.firstFormGroup.get("idReferente").touched
    );
  }
}
