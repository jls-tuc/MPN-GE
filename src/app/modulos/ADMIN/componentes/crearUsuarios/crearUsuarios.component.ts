import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Iusuario } from "app/modulos/elecciones/interfaces/usuario.interfaces";
import { PadronesService } from "app/modulos/elecciones/services/padrones.service";
import { ProvLocService } from "app/shared/services/prov-loc.service";
import Swal from "sweetalert2";
import { avatar } from "../../avatarBase64";
import { AdminServiceService } from "../../services/adminService.service";
import { Observable } from "rxjs";
import { filter, map, startWith } from "rxjs/operators";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-crearUsuarios",
  templateUrl: "./crearUsuarios.component.html",
  styleUrls: ["./crearUsuarios.component.scss"],
})
export class CrearUsuariosComponent implements OnInit {
  secondFormGroup: FormGroup;
  sexo = [
    {
      tipo: "Maculino",
      value: "m",
    },
    {
      tipo: "Femenino",
      value: "f",
    },
    {
      tipo: "Otro",
      value: "o",
    },
  ];
  tipoUsuario = [
    { tipo: "Administrador de Afiliaciones", value: "user-adminafilia" },
    { tipo: "Administrador de Sistemas", value: "admin" },
    { tipo: "Afiliación", value: "user-afilia" },
    { tipo: "Coordinador", value: "user-coord" },
    { tipo: "Graficos estadisticos", value: "user-calc" },
    { tipo: "Referente", value: "user-ref" },
    { tipo: "Responsable de planilla", value: "user-resp" },
  ];
  fotoAvatar: string = avatar;
  idReferente: string;
  role: string;
  idReferentes: any[] = [];
  referentes: string[];
  cargando: boolean = false;
  datosRenaper: {};
  usuarioForm: Iusuario;
  usuarioRol: any = {};
  public provLoc: any[] = [];
  localidades: any[] = [];
  loc: any[] = [];

  public provincia: any[] = [];
  public ocultarBusqueda = false;
  public cargar_datos: boolean = false;
  public buscar_datos: boolean = true;
  public cargarRef: boolean = false;
  public ocultarPaso: boolean = false;
  myControl = new FormControl('');
  options: string[] = ["Sam", "Varun", "Jasmine"];
  seccionales: any[] = [];
  filteredOptions;
  filteredSeccional;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CrearUsuariosComponent>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private personaPadron: PadronesService,
    private provLocService: ProvLocService,

    private adminService: AdminServiceService
  ) {
    this.dataPForm();
  }

  ngOnInit() {
    /*     this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        ); */
    this.obtProvLoc();
    this.obtLocalidades();
    this.obtSeccionales();

  }

  dataPForm(data?) {
    this.secondFormGroup = this.fb.group({
      nombres: [data ? data.nombre : ""],
      apellido: [data ? data.apellido : ""],
      dni: [
        data ? data.dni : "",
        [Validators.required, Validators.maxLength(8)],
      ],
      sexo: [data ? data.sexo : "", [Validators.required]],

      provincia: [data ? data.provincia : "Neuquen"],
      localidad: [data ? data.localidad : ""],
      calle: [data ? data.domicilio : ""],
      numero: [data ? data.numero : ""],
      email: [
        "",
        [Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")],
      ],
      telefono: [""],
      seccional: ["", [Validators.required]],
      usuario: [data ? data.dni : ""],
      password: [data ? this.getPassword(data.nombre.toLowerCase()) : ""],
      activo: [true],
      fechaAltaUsuario: [""],
      fechaBajaUsuario: [null],
      lastLogin: [""],
      role: ["", [Validators.required]],
      idReferente: [{ value: "", disabled: true }],
      localidad2: [""]
    });
    this.secondFormGroup.get('localidad2').valueChanges.subscribe(response => {
      console.log('Data is ', response);
      this.filterData(response);
    })
    this.secondFormGroup.get('seccional').valueChanges.subscribe(response => {
      console.log('Data is ', response);
      this.filterSeccional(response);
    })

  }

  filterData(enteredData) {
    this.filteredOptions = this.options.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  filterSeccional(enteredData) {
    this.filteredSeccional = this.seccionales.filter(item => {
      return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1
    })
  }

  obtProvLoc() {
    this.provLocService.getProvLocalidades().subscribe((data: any) => {
      this.provLoc = data.data;
      this.provincia = [
        ...new Set(this.provLoc.map((item) => item.provincia_nombre)),
      ];
    });
  }

  obtSeccionales() {
    this.adminService.obtenerSeccionales().subscribe((res: any) => {
      const seccionalesTemp: string[] = res.data.map(item => item.seccional);
      this.seccionales = seccionalesTemp;
      this.filteredSeccional = seccionalesTemp;
    });
  }

  obtLocalidades() {
    this.provLocService.getLocalidades().subscribe((data: any) => {
      this.options = data;
      this.filteredOptions = data;
    });
  }

  provSelect(e?: any) {
    this.localidades = this.provLoc.filter(
      (data) => data.provincia_nombre === e
    );
    this.ngOnInit();
    this.cdr.detectChanges();
  }
  async buscarDNI() {
    this.cargando = true;
    this.adminService
      .obtenerUsr(this.secondFormGroup.get("dni").value)
      .subscribe(async (res: any) => {
        if (res.ok) {
          await Swal.fire({
            title: "Usuario existente",
            text: "El número de documento ingresado, ya se encuentra asignado a un usuario.",
            showConfirmButton: true,
            icon: "info",
          });
          this.secondFormGroup.reset();
          this.cargando = false;
        } else {
          const params: {} = `documento=${this.secondFormGroup.get("dni").value
            }&sexo=${this.secondFormGroup.get("sexo").value}`;

          this.personaPadron
            .getPadronNqn(params)
            .subscribe(async (data: any) => {
              if (data.ok) {
                this.cargando = false;
                this.ocultarBusqueda = true;
                this.datosRenaper = data;
                data.data.dni = this.secondFormGroup.get("dni").value;
                data.data.sexo = this.secondFormGroup.get("sexo").value;

                this.dataPForm(data.data);
              } else {
                this.cargando = false;
                Swal.fire({
                  position: "top-end",
                  icon: "warning",
                  title: "Por favor, verifique los datos ingresados.",
                  showConfirmButton: false,
                  timer: 3500,
                });
              }
            });
        }
      });
  }
  guardar() {
    this.usuarioForm = {
      usuario: this.secondFormGroup.get("dni").value,
      password: this.secondFormGroup.get("password").value,
      activo: true,
      fechaAltaUsuario: "",
      fechaBajaUsuario: "",
      lastLogin: "",
      role: this.secondFormGroup.get("role").value,
      idCoordinador: "",
      idReferente: this.idReferente,
      seccional: this.secondFormGroup.get("seccional").value,
      datosPersonales: {
        nombres: this.secondFormGroup.get("nombres").value,
        apellido: this.secondFormGroup.get("apellido").value,
        dni: this.secondFormGroup.get("dni").value,
        sexo: this.secondFormGroup.get("sexo").value,
        calle: this.secondFormGroup.get("calle").value,
        foto: this.fotoAvatar,
        numero: this.secondFormGroup.get("numero").value,
        provincia: this.secondFormGroup.get("provincia").value,
        localidad: this.secondFormGroup.get("localidad").value,
        email: this.secondFormGroup.get("email").value,
        telefono: this.secondFormGroup.get("telefono").value,
        areaResponsable: "",
      },
    };

    this.adminService
      .crearUsr(this.usuarioForm)
      .subscribe(async (data: any) => {
        if (data.ok === true) {
          await Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Usuario creado, correctamente.`,
            text: `La contraseña asiganda es:${this.usuarioForm.password}`,
            showConfirmButton: true,
          });
          this.cargando = false;
          this.secondFormGroup.reset();
        } else {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: `${data.msg}`,
            showConfirmButton: false,
            timer: 3500,
          });
          this.cargando = false;
          this.closePopUp();
        }
      });
  }

  getPassword(nombre: string) {
    let pass: any = nombre.split(" ");
    let fecha = new Date();
    let total = nombre.length * fecha.getDate();
    let newPass = pass[0].charAt(0) + pass[1].charAt(0) + ".MPN." + total;
    return newPass;
  }

  closePopUp() {
    this.dialogRef.close();
  }

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
    return this.secondFormGroup.get("idReferente");
  }

  get campoRoleNoValido() {
    return (
      this.secondFormGroup.get("role").invalid &&
      this.secondFormGroup.get("role").touched
    );
  }
  get campoIdNoValido() {
    return (
      this.secondFormGroup.get("idReferente").invalid &&
      this.secondFormGroup.get("idReferente").touched
    );
  }
}
