import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CargarVotoService } from "app/modulos/elecciones/services/cargar-voto.service";
import { UserModel } from "app/shared/models/user.model";
import { JwtAuthService } from "app/shared/services/auth/jwt-auth.service";
import { Observable } from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: "app-cargarChasqui",
  templateUrl: "./cargarChasqui.component.html",
  styleUrls: ["./cargarChasqui.component.scss"],
})
export class CargarChasquiComponent implements OnInit {
  chasquiForm: FormGroup;
  nroOrdenFrom: FormGroup;
  dataApi: any = [];
  escuelas: any = [];
  mesas: any = [];
  escuelaSeleccionada: string;
  mesaSeleccionada: string;
  user$: Observable<UserModel>;
  usurioLog: any;

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
    this.chasquiForm = this.fb.group({
      establecimiento: [
        data ? data.establecimiento : "",
        [Validators.required],
      ],
      mesa: [
        data ? data.mesa : "",
        [Validators.required, Validators.maxLength(4)],
      ],
      nroOrden: [
        data ? data.nroOrden : "",
        [Validators.required, Validators.maxLength(4)],
      ],
      ordenes: this.fb.array([]),
      eleccion: "internas 2022",
    });
  }

  cargarChasqui() {
    this.cargarVotoServ
      .postChasqui(this.chasquiForm.value)
      .subscribe((res: any) => {
        //  console.log(res);
        if (res.ok) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `El número ${this.chasquiForm.value.nroOrden},de la mesa ${this.chasquiForm.value.mesa}, fue cargado correctamente.`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: `${res.msg || res.error}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }
  cancelar() {
    this.chasquiForm.reset();
    this.reloadCurrentRoute();
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
