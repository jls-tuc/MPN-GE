import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CargarVotoService } from "app/modulos/elecciones/services/cargar-voto.service";
import { UserModel } from "app/shared/models/user.model";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { Observable } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: "app-CargarActaEscrutinio",
  templateUrl: "./CargarActaEscrutinio.component.html",
  styleUrls: ["./CargarActaEscrutinio.component.scss"],
})
export class CargarActaEscrutinioComponent implements OnInit {
  actaEscrutinio: FormGroup;
  listaForm: FormGroup;
  dataApi: any = [];
  escuelas: any = [];
  mesas: any = [];
  user$: Observable<UserModel>;
  usurioLog: any;
  listasEslecciones: string[] = [
    "amarilla",
    "azul",
    "azul y blanca",
    "celeste",
    "fucsia",
    "naranja",
    "roja",
    "verde",
  ];
  localidadSeleccionada: string;
  escuelaSeleccionada: string;
  mesaSeleccionada: string;
  constructor(
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

  ngOnInit() {
    this.cargarActas();
  }
  cargarActas() {
    this.cargarVotoServ.getActasEscrutinios().subscribe((res: any) => {
      this.dataApi = res.data;
      res.data.forEach((element) => {
        this.escuelas.push(element.establecimiento);
      });
    });
  }
  cargarMesa() {
    let dataSeleccionada = this.dataApi.find(
      (element) => element.establecimiento === this.escuelaSeleccionada
    );

    this.mesas = dataSeleccionada.mesas.filter(
      (element) => element.actaCargada === false
    );
  }

  initForm(data?) {
    this.actaEscrutinio = this.fb.group({
      establecimiento: [
        data ? data.establecimiento : "",
        [Validators.required],
      ],
      mesa: [
        data ? data.mesa : "",
        [Validators.required, Validators.maxLength(4)],
      ],
      actaCargada: true,
      electoresVotaron: [
        data ? data.electoresVotaron : "",
        [Validators.required, Validators.maxLength(4)],
      ],
      sobresUrnas: [
        data ? data.sobresUrnas : "",
        [Validators.required, Validators.maxLength(4)],
      ],
      diferencia: [
        data ? data.diferencia : "",
        [Validators.required, Validators.maxLength(4)],
      ],
      votosNulos: [
        data ? data.votosNulos : "",
        [Validators.required, Validators.maxLength(4)],
      ],
      votosRecurridos: [
        data ? data.votosRecurridos : "",
        [Validators.required, Validators.maxLength(4)],
      ],
      votosBlanco: [
        data ? data.votosBlanco : "",
        [Validators.required, Validators.maxLength(4)],
      ],
      votosImpugnados: [
        data ? data.votosImpugnados : "",
        [Validators.required, Validators.maxLength(4)],
      ],
      totalVotos: [
        data ? data.totalVotos : "",
        [Validators.required, Validators.maxLength(4)],
      ],
      usuario: [data ? data.usuario : ""],
      listas: this.fb.array([]),
    });
  }
  get listas() {
    return this.actaEscrutinio.controls["listas"] as FormArray;
  }
  cargarEscrutinio(mesa?) {}

  addLista() {
    this.listaForm = this.fb.group({
      lista: ["", Validators.required],
      resultado: ["", Validators.required],
    });
    this.listas.push(this.listaForm);
  }

  deleteLista(indexLista: number) {
    this.listas.removeAt(indexLista);
  }

  saveEscrutinio() {
    this.cargarVotoServ
      .postActasEscrutinio(this.actaEscrutinio.value)
      .subscribe((res: any) => {
        //  console.log(res);
        if (res.ok) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `El acta de la mesa nro:${this.actaEscrutinio.value.mesa}, fue cargada correctamente.`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.actaEscrutinio.reset();
          this.reloadCurrentRoute();
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `${res.msg || res.error}`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.actaEscrutinio.reset();
          this.reloadCurrentRoute();
        }
      });
  }

  cancelar() {
    this.actaEscrutinio.reset();
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
