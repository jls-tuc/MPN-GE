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
import { PadronesService } from "app/modulos/elecciones/services/padrones.service";
import { UserModel } from "app/shared/models/user.model";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { AfiliacionService } from "../../../../services/afiliacion.service";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { generarPlanilla } from "../../../planillaPdf/planillaPdf";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-formPopUpafilia",
  templateUrl: "./formPopUpafilia.component.html",
  styleUrls: ["./formPopUpafilia.component.scss"],
})
export class PopUpFormAfiliaComponent implements OnInit {
  user$: Observable<UserModel>;
  usurioLog: any;
  sexo: string[] = ["F", "M", "O"];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  datosPadronNqn: {};
  datosAfiliados: {};
  cargando: boolean = false;
  localidades: any[] = [];
  ocultarBusqueda = false;
  cargar_datos: boolean = false;
  buscar_datos: boolean = true;
  cargarRef: boolean = false;
  ocultarPaso: boolean = false;
  opVer: boolean = false;
  editar: boolean = false;
  constructor(
    @Optional() public dialogRef: MatDialogRef<PopUpFormAfiliaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: JwtAuthService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private afiliadoService: AfiliacionService,
    private padronService: PadronesService
  ) {
    this.user$ = this.auth.currentUserSubject.asObservable();
    this.usurioLog = this.user$;
    this.cargarFormAfiliacion();
    this.buildSecondForm();
    if (this.data.title === "Ver planilla") {
      this.verPlanilla(this.data.value);
    }
  }

  ngOnInit(): void {}

  cargarFormAfiliacion(data?) {
    this.firstFormGroup = this.fb.group({
      dni: [
        data ? data.documento : "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(8),
        ],
      ],
      sexo: [data ? data.genero : "", [Validators.required]],
    });
  }
  buildSecondForm(dataPadron?) {
    this.secondFormGroup = this.fb.group({
      nombre: [dataPadron ? dataPadron.nombre : ""],
      apellido: [dataPadron ? dataPadron.apellido : ""],
      documento: [dataPadron ? dataPadron.documento : ""],
      dm: [dataPadron ? dataPadron.dm : ""],
      rg: [dataPadron ? dataPadron.rg : ""],
      clase: [dataPadron ? dataPadron.clase : ""],
      genero: [dataPadron ? dataPadron.genero : ""],
      fechaNacimiento: [dataPadron ? dataPadron.fechaNacimiento : ""],
      lugar: [dataPadron ? dataPadron.lugar : ""],
      profOficio: [dataPadron ? dataPadron.profOficio : ""],
      estadoCivil: [dataPadron ? dataPadron.estadoCivil : ""],
      ultDomicilio: this.fb.group({
        distritoElec: [dataPadron ? dataPadron.distritoElec : ""],
        partidoDepto: [dataPadron ? dataPadron.partidoDepto : ""],
        cuartelPedania: [dataPadron ? dataPadron.cuartelPedania : ""],
        localidad: [dataPadron ? dataPadron.localidad : ""],
        calle: [dataPadron ? dataPadron.calle : ""],
        nro: [dataPadron ? dataPadron.nro : ""],
        piso: [dataPadron ? dataPadron.piso : ""],
        dep: [dataPadron ? dataPadron.dep : ""],
      }),
      domicilioPostal: this.fb.group({
        barrio: [dataPadron ? dataPadron.barrio : ""],
        circuito: [dataPadron ? dataPadron.circuito : ""],
        localidad: [dataPadron ? dataPadron.localidad : ""],
        calle: [dataPadron ? dataPadron.calle : ""],
        nro: [dataPadron ? dataPadron.nro : ""],
        piso: [dataPadron ? dataPadron.piso : ""],
        dep: [dataPadron ? dataPadron.dep : ""],
        telPar: [dataPadron ? dataPadron.telPar : ""],
        telTrab: [dataPadron ? dataPadron.telTrab : ""],
        contacto: [dataPadron ? dataPadron.contacto : ""],
        observaciones: [dataPadron ? dataPadron.observaciones : ""],
      }),
    });
  }
  buscarDatos(values?) {
    this.cargando = true;
    this.afiliadoService.getDniGrupo(values).subscribe((data: any) => {
      if (data.msg === "sin registros") {
        this.afiliadoService.getDniJuntaElectoras(values).subscribe(
          async (data: any) => {
            if (data.tipo_respuesta === "AFILIACION_VIGENTE") {
              await Swal.fire({
                position: "top-end",
                imageUrl: "./assets/images/logos/Logo_cne_350x60px.png",
                imageHeight: 50,
                title: "Afiliación Vigente",
                text: `El dni:${data.matricula}, del Sr/a:${data.apellido},${data.nombre}, se encuentra afiliado a un partido de ${data.distrito}
            Para mayor información consulte en la Secretaría Electoral de su domicilio actual.`,
              });
              this.dialogRef.close();
            } else
              await Swal.fire({
                position: "top-end",
                imageUrl: "./assets/images/logos/Logo_cne_350x60px.png",
                imageHeight: 50,
                title: "Sin Afiliación",
                text: `El dni:${data.matricula}, no tiene registros de afiliación.`,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Continuar",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.padronService
                    .getAfiliadoValue(values)
                    .subscribe((res: any) => {
                      if (res.ok) {
                        this.cargando = false;
                        Swal.fire({
                          position: "center",
                          imageUrl: "./assets/images/logos/200px-Logo_MPN.png",
                          imageHeight: 50,
                          title: "El DNI ya se encuentra afiliado al partido!",
                          text: `Afiliado/a:${res.data.apellido},${res.data.nombre}- DNI Nro:.${res.data.dni},`,
                          showConfirmButton: true,
                        });
                        this.dialogRef.close();
                      } else {
                        this.padronService
                          .getPadronNqnValue(values)
                          .subscribe((res: any) => {
                            if (res.ok) {
                              Swal.fire({
                                position: "top-end",
                                imageUrl:
                                  "./assets/images/logos/Logo_cne_350x60px.png",
                                imageHeight: 50,
                                title:
                                  "Registros encontrados en el padron electoral Nacional.",
                                text: `${res.data.apellido},${res.data.nombre}- DNI Nro:.${res.data.documento},`,
                                showCancelButton: false,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Continuar",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  this.buildSecondForm(res.data);
                                  this.cargando = false;
                                  this.ocultarBusqueda = true;
                                }
                              });
                            } else {
                              Swal.fire({
                                position: "center",
                                imageUrl:
                                  "./assets/images/logos/Logo_cne_350x60px.png",
                                imageHeight: 50,
                                title:
                                  "El DNI no se encuentre en el padron electoral Nacional",
                                showConfirmButton: true,
                              });
                              this.cargando = false;
                              this.ocultarBusqueda = true;
                            }
                          });
                        this.cargando = false;
                      }
                    });
                }
              });
          },
          async (error: any) => {
            if (error) {
              await Swal.fire({
                position: "top-end",
                imageUrl: "./assets/images/logos/Logo_cne_350x60px.png",
                imageHeight: 50,
                title: "Error del Servidor de la CNE",
                text: "Desea continuar con la afiliación?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Continuar",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.padronService
                    .getAfiliadoValue(values)
                    .subscribe((res: any) => {
                      if (res.ok) {
                        this.cargando = false;
                        Swal.fire({
                          position: "center",
                          imageUrl: "./assets/images/logos/200px-Logo_MPN.png",
                          imageHeight: 50,
                          title: "El DNI ya se encuentra afiliado al partido!",
                          text: `Afiliado/a:${res.data.apellido},${res.data.nombre}- DNI Nro:.${res.data.dni},`,
                          showConfirmButton: true,
                        });
                        this.dialogRef.close();
                      } else {
                        this.padronService
                          .getPadronNqnValue(values)
                          .subscribe((res: any) => {
                            if (res.ok) {
                              Swal.fire({
                                position: "top-end",
                                imageUrl:
                                  "./assets/images/logos/Logo_cne_350x60px.png",
                                imageHeight: 50,
                                title:
                                  "Registros encontrados en el padron electoral Nacional.",
                                text: `${res.data.apellido},${res.data.nombre}- DNI Nro:.${res.data.documento},`,
                                showCancelButton: false,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Continuar",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  this.buildSecondForm(res.data);
                                  this.cargando = false;
                                  this.ocultarBusqueda = true;
                                }
                              });
                            } else {
                              Swal.fire({
                                position: "center",
                                imageUrl:
                                  "./assets/images/logos/Logo_cne_350x60px.png",
                                imageHeight: 50,
                                title:
                                  "El DNI no se encuentre en el padron electoral Nacional",
                                showConfirmButton: true,
                              });
                              this.cargando = false;
                              this.ocultarBusqueda = true;
                            }
                          });
                        this.cargando = false;
                      }
                    });
                }
              });
            }
          }
        );
      } else {
        Swal.fire({
          position: "top-end",
          imageUrl: "./assets/images/logos/200px-Logo_MPN.png",
          imageHeight: 50,
          title: "EL Documento ya se encuentra cargado.",
          text: `El Lote:${data.data.nro}, contiene el documento nro:.${values.dni}, que desea ingresar `,
          showCancelButton: false,
        });
        this.dialogRef.close();
      }
    });
  }
  guardar(values) {
    this.afiliadoService.postPlanilla(values, this.data.nroLote).subscribe(
      async (resp: any) => {
        if (resp.ok) {
          await Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Planilla cargada con exito",
            showConfirmButton: false,
            timer: 2500,
          });

          await Swal.fire({
            title: "Imprimir?",
            text: "¿Quiere imprimir el formulario de afiliación.?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Imprimir!",
          }).then(async (result) => {
            if (result.isConfirmed) {
              let docDefinition = await generarPlanilla(values);
              await pdfMake.createPdf(docDefinition).open();
            }
          });

          this.dialogRef.close(resp.data);
        } else {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "La planilla ya se encuentra cargada",
            showConfirmButton: false,
            timer: 2500,
          });
          this.dialogRef.close();
        }
      },
      (error: any) => {
        Swal.fire({
          icon: "warning",
          title: "Error de conexion con el serivor",
          showConfirmButton: true,
          timer: 1500,
        });
        this.dialogRef.close();
      }
    );
  }
  verPlanilla(planilla) {
    this.cargarFormAfiliacion(planilla);
    this.buildSecondForm(planilla);
    this.opVer = true;
    this.editar = true;
    this.cargando = false;
    this.ocultarBusqueda = true;
  }
  activarForm() {
    Swal.fire({
      title: "Esta por editar este formulario.",
      text: "¿Desea continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Continuar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Los campos estan habilitados para ser modificados!");
        this.editar = !this.editar;
        this.cdr.markForCheck();
      }
    });
  }
  cerrarPopUP(value: string) {
    this.dialogRef.close(value);
  }

  get dniNoValido() {
    return (
      this.firstFormGroup.get("dni").invalid &&
      this.firstFormGroup.get("dni").touched
    );
  }

  get sexoNoValido() {
    return (
      this.firstFormGroup.get("sexo").invalid &&
      this.firstFormGroup.get("sexo").touched
    );
  }
}
